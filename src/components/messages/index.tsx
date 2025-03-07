import { useState, useRef, useEffect } from "react";
import {
  Box,
  Input,
  HStack,
  Spinner,
  InputRightElement,
  InputGroup,
  Tag,
  InputLeftElement,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { ScrollPagination } from "../paginatedChat";
import "../../styles/Chatbot.css";
import * as microsoftTeams from "@microsoft/teams-js";
import { useLocation, useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import { CloseIcon } from "@chakra-ui/icons";
import { LoaderAnimatedCircleIcon, SendButton } from "../../assets";
import {
  BOT,
  DISLIKED,
  NEW_ANSWER,
  PLAIN_QUESTION,
  USER,
  additionalQuestionUrl,
  queryUrl,
} from "../../utils.js";
import ChatMessage from "../chatMessage";
import { useTranslation } from "react-i18next";
import Breakpoints from "../mediaQuery";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ImageSliderPopup } from "../modals/ImageSliderPopup";
import { ScaleableImage } from "../scaleableImage/scaleableImage";
import { ArrowUpIcon, ZoomInIcon, ZoomOutIcon } from "../../assets/icons";
import { CustomPopup } from "../modals/CustomPopup";
import ImageSliderModal from "../modals/ImageSlider";
import Emitter from "../../services/emitter";
import useThreads from "../../hooks/useThreads";
import { useThreadContext } from "../../context/thread-context";

export const Messages = ({
  threadChatCountFlag,
  toggleThreadChatCount,
}: any) => {
  const params: any = useParams();
  const location = useLocation();
  const { t } = useTranslation("common");
  const { sm, md, lg } = Breakpoints();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<any>(null);
  const [scale, setScale] = useState(1);
  const [userId, setUserId] = useState<string | undefined>("");
  const [imagePopup, setImagePopup] = useState<boolean>(false);
  const [imageSliderPopup, setImageSliderPopup] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [chatLoader, setChatLoader] = useState(false);
  const inputRef = useRef<any>(null);
  const [threadId, setThreadId] = useState<string | undefined>(undefined);
  const [parentChatId, setParentChatId] = useState<string | null>(null);
  const [additionalQuestion, setAdditionalQuestion] = useState<any>(null);
  const [selectedIndices, setSelectedIndices] = useState<any>({});
  const [selectedIndex, setSelectedIndex] = useState(0); // default to the third image
  const [sliderImages, setSliderImages] = useState<any>([]);
  const [emptyFlag, setEmptyFlag] = useState<boolean>(false);
  const { getThreads, currentUnpinnedPage } = useThreadContext();
  const prevParamsRef = useRef<any>(null);
  const handleImageChange = (index: any) => {
    setSelectedIndex(index); // updates selected index when the image changes
  };

  const handleIndexChange = (
    messageId: any,
    newIndex: number,
    maxLength: number
  ) => {
    setSelectedIndices((prevIndices: any) => ({
      ...prevIndices,
      [messageId]: Math.min(Math.max(newIndex, 0), maxLength - 1),
    }));
  };

  type MessageType = {
    id: string;
    type?: "user" | "bot";
    content?: string;
    childAnswers?: any[];
    images?: {
      path: string;
      description: string;
    }[];
  };

  const handleClick = (event?: any) => {
    if (loading) return;

    if (event?.type === "keydown" && event?.key !== "Enter") {
      return;
    }

    if (event?.key === "Enter") {
      event?.preventDefault();
    }

    if (userInput) {
      const userMessage = {
        id: `user-${Date.now()}`,
        type: USER,
        content: userInput,
      };

      if (parentChatId) {
        setMessages((prevMessages: any) =>
          prevMessages?.map(
            (item: any) =>
              item.id === parentChatId && item?.type === USER
                ? {
                    ...item,
                    childQuestions: [...item.childQuestions, userInput],
                  } // Update the matching item
                : item // Keep other messages as they are
          )
        );
      } else {
        setMessages((prevMessages: any) => [...prevMessages, userMessage]);
      }
      setUserInput("");
      setLoading(true);

      let payload: any = {};
      if (threadId) payload.threadId = parseInt(threadId);
      if (parentChatId) payload.parent_chat_id = parentChatId;
      if (additionalQuestion) {
        payload.question = userInput;
        payload.chatId = additionalQuestion?.id;
        payload.content_id = additionalQuestion?.content?.content_id;
      } else payload.query = userInput;

      const url = additionalQuestion ? additionalQuestionUrl : queryUrl;

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/${url}`, payload, {
          headers: {
            "x-api-key": userId,
          },
        })
        .then((response: any) => {
          // if (emptyFlag) Emitter.emit("fetchThreads", true);
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
            id: response?.data?.data?.chatId,
            type: BOT,
            content: apiResponse,
            images: images,
          };

          if (parentChatId) {
            setMessages((prevMessages: any = []) =>
              prevMessages.map((item: any) =>
                item.id === parentChatId && item?.type === BOT
                  ? {
                      ...item,
                      childAnswers: [
                        ...(item?.childAnswers || []),
                        {
                          content: apiResponse,
                          images: Array.isArray(apiResponse?.images)
                            ? apiResponse.images
                                .filter((image: any) => image?.path)
                                .map((image: any) => ({
                                  path:
                                    process.env.REACT_APP_S3_BUCKET_URL +
                                    image?.path,
                                  description: image?.description,
                                }))
                            : [], // Provide an empty array if apiResponse.images is not an array
                        },
                      ],
                    }
                  : item
              )
            );
          } else {
            setMessages((prevMessages: any) => [...prevMessages, botMessage]);
          }
          if (parentChatId) {
            getChatByThreadId(params.threadId);
            const selectedMessage: any = messages?.find(
              (item) => item?.id == parentChatId && item?.type === USER
            );
            handleIndexChange(
              parentChatId,
              selectedMessage?.childQuestions?.length || 1,
              selectedMessage?.childQuestions?.length + 1 || 2
            );
          }
          autofocusInput();
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
          setParentChatId(null);
          setAdditionalQuestion(null);
          setEmptyFlag(false);
          // if (emptyFlag) {
          getThreads(userId, false, 1, "", true, currentUnpinnedPage * 25);
          // }
          // toggleThreadChatCount(params.threadId || threadId);
        });
    }
  };

  const handleInputChange = (event: any) => {
    setUserInput(event.target.value);
  };

  const isLikedMessage = (message: any, isLiked: number, type: string) => {
    const payload: any = {};

    if (type === DISLIKED) {
      payload.is_disliked = message?.is_disliked ? 0 : 1;
      payload.is_liked = 0;
    } else {
      payload.is_liked = message?.is_liked ? 0 : 1;
      payload.is_disliked = 0;
    }

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/feedback/${message?.id}
    `,
        payload,
        {
          headers: {
            "x-api-key": userId,
          },
        }
      )
      .then(() => {
        // if (message?.childAnswers?.length > 1) {
        //   setMessages((prevMessages: any) =>
        //     prevMessages.map((item: any) => {
        //       if (item.id === message?.id && item.type === BOT) {
        //         const updatedChildAnswers = item.childAnswers.map(
        //           (answer: any, i: number) =>
        //             i === selectedIndices[message?.id]
        //               ? { ...answer, is_liked: isLiked }
        //               : answer
        //         );
        //         return { ...item, childAnswers: updatedChildAnswers };
        //       }
        //       return item;
        //     })
        //   );
        // }
        // else
        setMessages((prevMessages: any) =>
          prevMessages?.map(
            (item: any) =>
              item.id === message?.id && item?.type === BOT
                ? {
                    ...item,
                    is_liked: payload.is_liked,
                    is_disliked: payload.is_disliked,
                  } // Update the matching item
                : item // Keep other messages as they are
          )
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderComponent = () => {
    return (
      <ScrollPagination
        child={
          <Box className="chat-body" overflowY="auto">
            {messages?.map((message: any, index: number) => {
              const selectedIndex = selectedIndices[message?.id] || 0;
              return (
                <ChatMessage
                  key={index}
                  message={message}
                  index={index}
                  selectedIndex={selectedIndex}
                  handleIndexChange={handleIndexChange}
                  setSelectedImage={setSelectedImage}
                  setImagePopup={setImagePopup}
                  setImageSliderPopup={setImageSliderPopup}
                  isLikedMessage={isLikedMessage}
                  autofocusInput={autofocusInput}
                  setAdditionalQuestion={setAdditionalQuestion}
                  setParentChatId={setParentChatId}
                  handleAdditionalQuestion={handleAdditionalQuestion}
                  setSliderImages={setSliderImages}
                  setSelectedIndex={setSelectedIndex}
                />
              );
            })}
            {loading && (
              <HStack style={{ display: "flex", justifyContent: "center" }}>
                <Box
                  backgroundColor={"#0C2340"}
                  height={sm ? "50px" : "64px"}
                  borderRadius={"16px"}
                  color={"white"}
                  fontSize={"14px"}
                  fontWeight={400}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  paddingInline={"20px"}
                >
                  <LoaderAnimatedCircleIcon />
                  <span style={{ marginLeft: "10px" }}>
                    {t("chats.analyzing")}
                  </span>
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

  const ChatHistory = () => {
    return messages?.length > 0 ? (
      <div
        style={{
          maxHeight: "calc(100% - 93px)",
          height: "calc(100% - 93px)",
          overflow: "scroll",
          marginBlock: "10px",
        }}
      >
        {renderComponent()}
      </div>
    ) : (
      !chatLoader && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxHeight="calc(100% - 93px)"
          height="calc(100% - 93px)"
          color="gray.300"
        >
          {t("chats.noHistory")}
        </Box>
      )
    );
  };

  const getChatByThreadId = (threadId: string) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/chat/${threadId}`, {
        headers: {
          "x-api-key": userId,
        },
        params: {
          limit: 1000,
        },
      })
      .then((response: any) => {
        const apiResponse = response?.data?.data?.rows;
        const messages = cloneDeep(
          apiResponse?.flatMap((item: any) => [
            {
              id: item.id,
              chatId: item?.chatId,
              type: BOT,
              chat_type: item.chat_type,
              content: JSON.parse(item?.answer),
              is_liked:
                typeof item.is_liked === "boolean" ? item.is_liked : undefined,
              is_disliked:
                typeof item.is_disliked === "boolean"
                  ? item.is_disliked
                  : undefined,

              childAnswers: [
                {
                  chat_type: item.chat_type,
                  content: JSON.parse(item?.answer),
                  is_liked:
                    typeof item.is_liked === "boolean"
                      ? item.is_liked
                      : undefined,
                  is_disliked:
                    typeof item.is_disliked === "boolean"
                      ? item.is_disliked
                      : undefined,
                  images: JSON.parse(item?.answer)
                    ?.images.filter((image: any) => image?.path)
                    .map((image: any) => ({
                      path: process.env.REACT_APP_S3_BUCKET_URL + image?.path,
                      description: image?.description,
                    })),
                },
                ...item.childChats.map((child: any) => {
                  return {
                    chat_type: child.chat_type,
                    content: JSON.parse(child?.answer),
                    is_liked:
                      typeof child.is_liked === "boolean"
                        ? child.is_liked
                        : undefined,
                    images: JSON.parse(child?.answer)
                      ?.images.filter((image: any) => image?.path)
                      .map((image: any) => ({
                        path: process.env.REACT_APP_S3_BUCKET_URL + image?.path,
                        description: image?.description,
                      })),
                  };
                }),
              ],
              images: JSON.parse(item?.answer)
                ?.images.filter((image: any) => image?.path)
                .map((image: any) => ({
                  path: process.env.REACT_APP_S3_BUCKET_URL + image?.path,
                  description: image?.description,
                })),
            },
            {
              id: item?.id,
              chatId: item?.chatId,
              type: USER,
              chat_type: item?.chat_type,
              content: item?.question,
              childQuestions: [
                item.question,
                ...item?.childChats?.map((child: any) => child?.question),
              ],
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

  const handleAdditionalQuestion = (additionalAnswer: any, message: any) => {
    // const userMessage = {
    //   id: `user-${Date.now()}`,
    //   type: USER,
    //   chat_type: NEW_ANSWER,
    //   created: USER,
    //   work_type: additionalAnswer?.work_type,
    //   issue_title: additionalAnswer?.issue_title,
    //   o_value: additionalAnswer?.o_value,
    //   p_value: additionalAnswer?.p_value,
    //   q_value: additionalAnswer?.q_value,
    // };
    const userMessage = {
      id: `user-${Date.now()}`,
      type: USER,
      chat_type: PLAIN_QUESTION,
      content: additionalAnswer?.issue_title,
      created: USER,
    };
    setMessages((prevMessages: any) => [...prevMessages, userMessage]);
    setLoading(true);

    // const payload = {
    //   threadId: parseInt(params?.threadId) || threadId,
    //   chatId: message?.id,
    //   content_id: additionalAnswer?.content_id,
    //   question: {
    //     work_type: additionalAnswer?.work_type,
    //     issue_title: additionalAnswer?.issue_title,
    //     o_value: additionalAnswer?.o_value,
    //     p_value: additionalAnswer?.p_value,
    //     q_value: additionalAnswer?.q_value,
    //   },
    // };
    const payload = {
      threadId: parseInt(params?.threadId) || threadId,
      query: additionalAnswer?.issue_title,
    };
    axios
      // .post(
      //   `${process.env.REACT_APP_BASE_URL}/user/new-answer
      // `,
      //   payload,
      //   {
      //     headers: {
      //       "x-api-key": userId,
      //     },
      //   }
      // )
      .post(
        `${process.env.REACT_APP_BASE_URL}/user/${queryUrl}
      `,
        payload,
        {
          headers: {
            "x-api-key": userId,
          },
        }
      )
      .then((response) => {
        const apiResponse = response?.data?.data;
        let images = [];

        if (apiResponse?.images?.length > 0) {
          images = apiResponse?.images
            .filter((image: any) => image.path)
            .map((image: any) => ({
              path: process.env.REACT_APP_S3_BUCKET_URL + image.path,
              description: image.description,
            }));
        }

        const botMessage = {
          id: response?.data?.data?.chatId,
          type: BOT,
          content: apiResponse,
          images: images,
        };

        setMessages((prevMessages: any) => [...prevMessages, botMessage]);
        getChatByThreadId(params.threadId || threadId);
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setLoading(false);
        getThreads(userId, false, 1, "", true, currentUnpinnedPage * 25);
      });
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
    console.log("params ", params, userId);
    if (params?.threadId && userId) {
      autofocusInput();
      setAdditionalQuestion(null);
      setThreadId(params.threadId);
      // if (params?.threadId != prevParamsRef?.current?.threadId) {
      setMessages([]);
      setChatLoader(true);
      getChatByThreadId(params.threadId);
      // }
    } else {
      // setThreadId("");
      // setMessages([]);
    }
    // prevParamsRef.current = params;
  }, [params, userId]);

  useEffect(() => {
    setUserInput(decodeURIComponent(location?.search?.slice(1)));
    setEmptyFlag(true);
  }, [location]);

  useEffect(() => {
    if (emptyFlag && userId) handleClick();
  }, [emptyFlag, userId]);

  const ImageSliderFeature = ({ src = "" }: any) => {
    return (
      <Carousel
        showArrows={true}
        selectedItem={selectedIndex}
        onChange={handleImageChange} // fires when the slide changes
      >
        {sliderImages.map((image: any) => (
          <>
            <img src={image?.path} style={{ width: "300px" }} />
          </>
        ))}
      </Carousel>
    );
  };

  const ImageZoomFeature = ({ src = "" }: any) => {
    return (
      <Flex
        width={"100%"}
        justifyContent={"center"}
        align={"center"}
        gap={"6px"}
        flexDirection={"column"}
        // maxH={"380px"}
      >
        <Box
          width={"100%"}
          height={"100%"}
          // minH={"400px"}
          // top={5}
        >
          <ScaleableImage src={src.path} scale={scale} />
        </Box>
        <Flex
          // position={"absolute"}
          display={"flex"}
          justifyContent={"center"}
          bottom="10px"
          width={{ base: "100%", sm: "430px" }}
          gap={"6px"}
        >
          <ZoomInIcon
            onClick={() => {
              if (scale <= 10) {
                setScale(scale + 1);
              }
            }}
            width={sm ? "30px" : "40px"}
          />
          <Slider
            width={sm ? "200px" : "50%"}
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
            width={sm ? "30px" : "40px"}
          />
        </Flex>
      </Flex>
    );
  };

  return (
    <Box
      className="chat-widget"
      overflowY={"hidden"}
      paddingInline={"10px"}
    >
      {chatLoader && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          h={"calc(100% - 73px)"}
          maxH={"calc(100% - 73px)"}
        >
          <Spinner color="blue" />
        </Box>
      )}
      {ChatHistory()}

      <Box
        className="chat-input-container"
        display="flex"
        alignItems="center"
        marginInline={sm || md || lg ? "10px" : "40px"}
      >
        <InputGroup>
          {additionalQuestion && (
            <InputLeftElement
              justifyContent={"start"}
              width={"100%"}
              height="100%"
              marginLeft={"5px"}
              onClick={() => inputRef.current && inputRef.current.focus()} // Ensure input focuses when clicking on the Tag area
            >
              <Tag
                style={{
                  background: "#C0D6F3",
                  fontSize: "12px",
                  marginLeft: "10px",
                }}
              >
                {t("chats.additionalQuestion")}
                <CloseIcon
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  boxSize={1.5}
                  onClick={() => {
                    setParentChatId(null);
                    setAdditionalQuestion(null);
                    autofocusInput(); // Ensures that after removing the tag, the input is focused
                  }}
                />
              </Tag>
            </InputLeftElement>
          )}

          <Input
            ref={inputRef}
            value={userInput}
            height={"64px"}
            onChange={handleInputChange}
            placeholder={t("chats.ask")}
            flex={1}
            pl={additionalQuestion ? "90px" : "10px"}
            disabled={loading}
            style={{ background: "#E9E9EE", borderRadius: "16px" }}
            onKeyDown={handleClick}
            _focus={{
              borderColor: "transparent", // Ensure border remains transparent on focus
              boxShadow: "none", // Ensure no box shadow on focus
            }}
            sx={{
              "::-webkit-input-placeholder": { color: "#18191B" }, // For Webkit-based browsers
              "::-moz-placeholder": { color: "#18191B" }, // For Firefox 19+
              ":-ms-input-placeholder": { color: "#18191B" }, // For IE
              "::-ms-input-placeholder": { color: "#18191B" }, // For Edge
              "::placeholder": { color: "#18191B" }, // Standard placeholder styling
            }}
          />
          <InputRightElement
            height="100%"
            style={{ marginRight: "10px" }}
            onClick={handleClick}
          >
            <SendButton
              active={userInput}
              width={sm ? "24" : "32"}
              height={sm ? "24" : "32"}
            />
          </InputRightElement>
        </InputGroup>
      </Box>

      <ImageSliderModal
        isOpen={imageSliderPopup}
        onClose={() => {
          setImageSliderPopup(false);
          setSelectedIndex(0);
        }}
        selectedIndex={selectedIndex}
        data={sliderImages}
      />

      <CustomPopup
        // width="45%"
        minH={"70vh"}
        paddingX={"20px"}
        onClose={() => {
          setImagePopup(false);
          setScale(1);
        }}
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
