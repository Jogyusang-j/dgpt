import { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Image,
  VStack,
  HStack,
  Stack,
  Skeleton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollPagination } from "../paginatedChat";
import "../../styles/Chatbot.css";
import { CustomPopup } from "../modals/CustomPopup";
import { ScaleableImage } from "../scaleableImage/scaleableImage";
import { ZoomInIcon } from "../../assets/icons/zoomIn";
import { ZoomOutIcon } from "../../assets/icons";
import { SendMessageIcon } from "../../assets/icons";
import * as microsoftTeams from "@microsoft/teams-js";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash";

export const Chatbot = () => {
  const params = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<any>(null);
  const [scale, setScale] = useState(1);
  const [userId, setUserId] = useState<string | undefined>("");
  const [imagePopup, setImagePopup] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [chatLoader, setChatLoader] = useState(false);
  const inputRef = useRef<any>(null);
  const [threadId, setThreadId] = useState<string | undefined>(undefined);

  type MessageType = {
    id: string;
    type: "user" | "bot";
    content: string;
    images?: {
      path: string;
      description: string;
    }[];
  };

  const getInitials = (input: any) => {
    if (input) {
      // Split the input string into an array of words
      const words = input.trim().split(/\s+/);

      // Extract the first letter of each word and combine them
      const initials = words
        .map((word: any) => word.charAt(0).toUpperCase())
        .join("");

      // Return only the first two letters of the combined initials
      return initials.slice(0, 2);
    } else return "AA";
  };

  const handleClick = (event: any) => {
    if (loading) return;

    if (event.type === "keydown" && event.key !== "Enter") {
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
    }

    if (userInput) {
      const userMessage = {
        id: `user-${Date.now()}`,
        type: "user",
        content: userInput,
      };

      setMessages((prevMessages: any) => [...prevMessages, userMessage]);
      setUserInput("");
      setLoading(true);

      let payload: any = { query: userInput };
      if (threadId) payload.threadId = threadId;

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/query`, payload, {
          headers: {
            "x-api-key": userId,
          },
        })
        .then((response) => {
          setThreadId(response?.data?.data?.threadId);
          let images = [];
          const apiResponse = response?.data?.data;
          if (apiResponse?.images?.length > 0) {
            images = apiResponse?.images
              .filter((image: any) => image.path)
              .map((image: any) => ({
                path: process.env.REACT_APP_S3_BUCKET_URL + image.path,
                description: image.description,
              }));
          }

          const botMessage = {
            id: `bot-${Date.now()}`,
            type: "bot",
            content: apiResponse?.response,
            images: images,
          };

          setMessages((prevMessages: any) => [...prevMessages, botMessage]);
          setLoading(false);

          autofocusInput();
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error:", error);
        });
    }
  };

  const handleInputChange = (event: any) => {
    setUserInput(event.target.value);
  };

  const renderComponent = () => {
    return (
      <ScrollPagination
        child={
          <Box className="chat-body" overflowY="auto" mb={4}>
            {messages.map((message: any) => (
              <VStack key={message?.id} align="start" mb={4}>
                <HStack alignItems={"normal"}>
                  <Box
                    bg="gray.200"
                    borderRadius="full"
                    p={2}
                    marginLeft={"12px"}
                    w="40px"
                    h="40px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {getInitials(
                      message.type === "bot"
                        ? "Artificial Intelligence"
                        : "User"
                    )}
                  </Box>
                  <Box
                    className="message-content"
                    ml={1}
                    p={2}
                    borderRadius="md"
                    w="fit-content"
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                    {message.images?.length > 0 && (
                      <Text mt={2} fontWeight="bold">
                        Images:
                      </Text>
                    )}
                    <Flex wrap="wrap" mt={2}>
                      {message.images?.map((image: any, index: any) => (
                        <Box key={index} m={2}>
                          <Image
                            src={image.path}
                            alt={`image-${index}`}
                            boxSize="200px"
                            onClick={() => {
                              setSelectedImage(image);
                              setImagePopup(true);
                            }}
                          />
                          <Text mt={2} fontWeight="bold">
                            Caption:
                          </Text>
                          <Text>{image.description}</Text>
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                </HStack>
              </VStack>
            ))}
            {loading && (
              <HStack>
                <Box
                  bg="gray.200"
                  borderRadius="full"
                  p={2}
                  marginLeft={"12px"}
                  w="40px"
                  h="40px"
                  display="flex"
                  justifyContent="center"
                >
                  {getInitials("Artificial Intelligence")}
                </Box>
                <Box ml={3}>
                  <Stack>
                    <Skeleton height="12px" width={"200px"} />
                    <Skeleton height="12px" width={"250px"} />
                    <Skeleton height="12px" width={"300px"} />
                  </Stack>
                </Box>
              </HStack>
            )}
            <div ref={messagesEndRef} />
          </Box>
        }
        data={messages}
      />
    );
  };

  const getChatByThreadId = (threadId: string) => {
    setChatLoader(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/chat/${threadId}`, {
        headers: {
          "x-api-key": userId,
        },
      })
      .then((response) => {
        const apiResponse = response?.data?.data;
        const messages = cloneDeep(
          apiResponse?.flatMap((item: any) => [
            {
              id: `bot-${item.id}`,
              type: "bot",
              content: JSON.parse(item?.answer)?.response,
              images: JSON.parse(item?.answer)
                ?.images.filter((image: any) => image?.path)
                .map((image: any) => ({
                  path: process.env.REACT_APP_S3_BUCKET_URL + image?.path,
                  description: image?.description,
                })),
            },
            {
              id: `user-${item.id}`,
              type: "user",
              content: item.question,
            },
          ])
        );
        setMessages(messages.reverse());
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setChatLoader(false));
  };

  const autofocusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {}, [messages]);

  useEffect(() => {
    autofocusInput();
    microsoftTeams.initialize();

    microsoftTeams.getContext((context) => {
      if (context) {
        const userID = context.userObjectId;
        setUserId(userID);
      } else {
        console.log("App is not running inside Microsoft Teams");
      }
    });
  }, []);

  useEffect(() => {
    if (params.threadId && userId) {
      setThreadId(params.threadId);
      getChatByThreadId(params.threadId);
    } else {
      setThreadId("");
      setMessages([]);
    }
  }, [params, userId]);

  const ImageZoomFeature = ({ src = "" }: any) => {
    return (
      <Flex justifyContent={"center"} align={"center"} gap={"6px"}>
        <Box width={"90%"} height={"100%"} position={"absolute"} top={0}>
          <ScaleableImage src={src.path} scale={scale} />
        </Box>
        <Flex
          position={"absolute"}
          left="30px"
          bottom="10px"
          width={{ base: "90%", sm: "430px" }}
          gap={"6px"}
        >
          <ZoomInIcon
            onClick={() => {
              if (scale <= 10) {
                setScale(scale + 1);
              }
            }}
            width={{ base: "41px", md: "67px" }}
          />
          <Slider
            aria-label="slider-ex-2"
            colorScheme="pink"
            onChange={(val) => setScale(Number(val / 10))}
            value={scale * 10}
            min={0}
            max={100}
          >
            <SliderTrack bg="#000">
              <SliderFilledTrack bg={"#000"} />
            </SliderTrack>
            <SliderThumb bg={"#000"} />
          </Slider>
          <ZoomOutIcon
            onClick={() => {
              if (scale > 1) {
                setScale(scale - 1);
              }
            }}
            width={{ base: "41px", md: "67px" }}
          />
        </Flex>
      </Flex>
    );
  };

  return (
    <Box className="chat-widget" overflowY={"hidden"}>
      <Box mb={4} marginLeft={"12px"}>
        <Text fontSize="2xl" fontWeight="bold">
          Chatbot
        </Text>
      </Box>
      {chatLoader && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          h={"100vh"}
        >
          <Spinner color="blue" />
        </Box>
      )}
      <div
        style={{
          maxHeight: "calc(100% - 120px)",
          height: "calc(100% - 120px)",
          overflow: "scroll",
        }}
      >
        {renderComponent()}
      </div>
      <Box
        className="chat-input-container"
        display="flex"
        alignItems="center"
        marginInline={3}
      >
        <Input
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter query here"
          flex={1}
          mr={2}
          onKeyDown={handleClick}
        />

        <SendMessageIcon disabled={loading} onClick={handleClick} />
      </Box>

      <CustomPopup
        width="95%"
        minH={"85vh"}
        paddingX={"30px"}
        onClose={() => null}
        showCloseHeader={false}
        open={imagePopup}
        children={<ImageZoomFeature loading={loading} src={selectedImage} />}
        onOutsideClick={() => {
          setImagePopup(false);
          setScale(1);
        }}
      />
    </Box>
  );
};
