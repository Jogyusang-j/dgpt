import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Tooltip,
  Tag,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  BOT,
  DISLIKED,
  LIKED,
  NEW_ANSWER,
  OBJECT,
  USER,
  carouselSliderProps,
  checkType,
  testRegex,
} from "../../utils.js";
import { BubbleChatQuestion, DgptLogo } from "../../assets";
import { ThumbsUpIcon } from "../../assets/icons";
import { ThumbsDownIcon } from "../../assets/icons";
import { PlusSignIcon } from "../../assets/icons";
import { useTranslation } from "react-i18next";
import AdditionalMessageBox from "../additionalMessageBox";
import Breakpoints from "../mediaQuery";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ChatMessage = ({
  message,
  index,
  selectedIndex,
  handleIndexChange,
  setSelectedImage,
  setImagePopup,
  setImageSliderPopup,
  isLikedMessage,
  autofocusInput,
  setAdditionalQuestion,
  setParentChatId,
  handleAdditionalQuestion,
  setSliderImages,
  setSelectedIndex,
}: any) => {
  const { t } = useTranslation("common");
  const { sm, md, lg, xl } = Breakpoints();
  const isAdditionalQuestion = Boolean(
    Number(process.env.REACT_APP_IS_ADDITIONAL_QUESTION)
  );

  const parsedContent =
    checkType(message?.content) === OBJECT ? JSON.parse(message?.content) : {};
  const selectedChildQuestion =
    message?.childQuestions?.length > 1
      ? message?.childQuestions[selectedIndex]
      : null;
  const parsedChildQuestion =
    checkType(selectedChildQuestion) === OBJECT
      ? JSON.parse(selectedChildQuestion)
      : {};

  const getValue = (field: any) => {
    return (
      (!testRegex(parsedContent?.[field]) && parsedContent?.[field]) ||
      (!testRegex(message?.[field]) && message?.[field])
    );
  };

  const CustomLeftArrow = ({ onClick }: any) => {
    return (
      <ChevronLeftIcon
        aria-label="Left Arrow"
        onClick={onClick}
        position="absolute"
        left={sm ? "0" : "1"}
        zIndex="2"
      />
    );
  };

  const CustomRightArrow = ({ onClick }: any) => {
    return (
      <ChevronRightIcon
        aria-label="Right Arrow"
        onClick={onClick}
        position="absolute"
        right={sm ? "0" : "1"}
        zIndex="2"
      />
    );
  };

  const displayIssueCode = () => {
    return message?.childAnswers?.length > 1
      ? message?.childAnswers[selectedIndex]?.content?.issue_code
      : message?.content?.issue_code;
  };

  const containerStyles = {
    color: "#0C2340",
    fontSize: "12px",
    fontWeight: "700",
    gap: "8px",
    display: "flex",
    alignItems: "center",
  };

  const furtherAnswersStyles = {
    color: "#5C6670",
    marginLeft: "7px",
    fontSize: "14px",
  };

  const renderImages = (
    images: any[],
    selectedIndex: number,
    setImageSliderPopup: (status: boolean) => void,
    setSliderImages: (images: any[]) => void,
    sm: boolean
  ) => {
    return images.map((image: any, index: any) => (
      <Box
        marginInline={sm ? "0px" : "5px"}
        key={index}
        display="flex"
        justifyContent="center"
        onClick={() => {
          setImageSliderPopup(true);
          setSliderImages(images);
          setSelectedIndex(index);
        }}
      >
        <Tooltip
          background={"white"}
          label={
            <VStack align="start" padding={1} maxW={250}>
              <Tag
                style={{
                  background: "#E4EBF0",
                  fontSize: "12px",
                  padding: "10px",
                }}
              >
                {t("chats.title")}
              </Tag>
              <Text fontSize="sm">
                {image?.description || "No description available"}
              </Text>
            </VStack>
          }
          aria-label={`Tooltip for image-${index}`}
          placement="top"
          hasArrow
          bg="gray.700"
          color="black"
        >
          <Image
            src={image.path}
            alt={`image-${index}`}
            width={
              sm ? "40px" : md ? "80px" : lg ? "100px" : xl ? "110px" : "170px"
            }
            height={
              sm ? "40px" : md ? "60px" : lg ? "70px" : xl ? "80px" : "120px"
            }
            objectFit={"cover"}
            borderRadius={"8px"}
            // boxSize={sm ? "150px" : "200px"}
            cursor="pointer"
            // paddingInline={images?.length > 2 ? "0px" : "10px"}
          />
        </Tooltip>
      </Box>
    ));
  };

  const renderCarouselImages = (
    message: any,
    selectedIndex: number,
    setImageSliderPopup: (status: boolean) => void,
    setSliderImages: (images: any[]) => void,
    sm: boolean
  ) => {
    if (message?.childAnswers?.length > 1) {
      return renderImages(
        message?.childAnswers[selectedIndex]?.images || [],
        selectedIndex,
        setImageSliderPopup,
        setSliderImages,
        sm
      );
    } else {
      return renderImages(
        message?.images || [],
        selectedIndex,
        setImageSliderPopup,
        setSliderImages,
        sm
      );
    }
  };

  return (
    <VStack key={index} align="start" mb={4}>
      <HStack
        alignItems={"normal"}
        style={{
          display: "flex",
          justifyContent: `${message?.type === BOT ? "start" : "end"}`,
          width: "100%",
        }}
        paddingInline={sm ? "15px" : "30px"}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {message?.type === USER && message?.childQuestions?.length > 1 && (
            <>
              <ChevronLeftIcon
                onClick={() =>
                  handleIndexChange(
                    message?.id,
                    selectedIndex - 1,
                    message?.childQuestions?.length
                  )
                }
              />
              <span style={{ marginInline: "4px", fontSize: "12px" }}>
                {selectedIndex + 1}/{message?.childQuestions?.length}
              </span>
              <ChevronRightIcon
                onClick={() =>
                  handleIndexChange(
                    message?.id,
                    selectedIndex + 1,
                    message?.childQuestions?.length
                  )
                }
              />
            </>
          )}
        </div>
        <Box
          className="message-content"
          ml={1}
          p={message?.type === BOT ? 2 : 0}
          maxWidth={sm ? "calc(100% - 20px)" : "calc(100% - 86px)"}
          overflowX={"auto"}
          background={message?.type === BOT ? "white" : "#E2EBF6"}
          border={`${message?.type === BOT ? "1px solid white" : "none"}`}
          borderRadius={"16px"}
          boxShadow="0px 2px 2px 0px #2023261A"
        >
          <Box
            display={"flex"}
            padding={
              message?.chat_type === NEW_ANSWER && message?.type === USER
                ? "5px"
                : "15px"
            }
          >
            <Box style={{ width: "10% !important" }}>
              {message?.type === BOT && (
                <DgptLogo width={sm ? 44 : 56} height={sm ? 44 : 56} />
              )}
            </Box>
            {!(message?.chat_type === NEW_ANSWER && message?.type === USER) && (
              <Box
                style={{
                  width: "90% !important",
                  paddingLeft: message?.type === BOT ? "15px" : "0px",
                }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message?.type === BOT
                    ? message?.childAnswers?.length > 1
                      ? message?.childAnswers[selectedIndex]?.content?.response
                      : message?.content?.response
                    : message?.childQuestions?.length > 1
                    ? message?.childQuestions[selectedIndex]
                    : message?.content}
                </ReactMarkdown>
              </Box>
            )}
            {message?.chat_type === NEW_ANSWER &&
              message?.type === USER &&
              message?.created === "user" && (
                <AdditionalMessageBox
                  workType={message?.work_type}
                  issueTitle={message?.issue_title}
                  oValue={!testRegex(message?.o_value) && message?.o_value}
                  pValue={!testRegex(message?.p_value) && message?.p_value}
                  qValue={!testRegex(message?.q_value) && message?.q_value}
                />
              )}

            {(message?.chat_type === NEW_ANSWER && message?.type === USER) ||
            (message?.type === USER &&
              message?.work_type &&
              message?.issue_title) ? (
              message?.childQuestions?.length > 1 ? (
                checkType(selectedChildQuestion) === OBJECT ? (
                  <AdditionalMessageBox
                    workType={
                      parsedChildQuestion?.work_type || selectedChildQuestion
                    }
                    issueTitle={
                      parsedChildQuestion?.issue_title || selectedChildQuestion
                    }
                    oValue={getValue("o_value")}
                    pValue={getValue("p_value")}
                    qValue={getValue("q_value")}
                  />
                ) : (
                  <div>{selectedChildQuestion}</div>
                )
              ) : checkType(message?.content) === OBJECT ? (
                <AdditionalMessageBox
                  workType={parsedContent?.work_type || message?.work_type}
                  issueTitle={
                    parsedContent?.issue_title || message?.issue_title
                  }
                  oValue={getValue("o_value")}
                  pValue={getValue("p_value")}
                  qValue={getValue("q_value")}
                />
              ) : (
                <div>{message?.content}</div>
              )
            ) : (
              ""
            )}
          </Box>

          {/* Images Section */}
          {(message?.childAnswers?.length > 1 ||
            message?.images?.length > 0) && (
            <>
              {(selectedIndex > 0
                ? message?.childAnswers[selectedIndex]?.images?.length > 0
                : message?.images?.length > 0) && (
                <div style={{ marginLeft: sm ? "10px" : "95px" }}>
                  <Text mt={2} fontWeight="bold">
                    {t("chats.images")}
                  </Text>
                </div>
              )}

              <Box
                style={{
                  width: "100%",
                  marginTop: "10px",
                  marginLeft: sm ? "0px" : "20px",
                  paddingInline: sm ? "1px" : "55px",
                  // marginLeft: sm ? "0px" : "20px",
                }}
              >
                <Carousel
                  partialVisible={true}
                  responsive={carouselSliderProps}
                  customLeftArrow={<CustomLeftArrow />}
                  customRightArrow={<CustomRightArrow />}
                >
                  {renderCarouselImages(
                    message,
                    selectedIndex,
                    setImageSliderPopup,
                    setSliderImages,
                    sm
                  )}
                </Carousel>
              </Box>
            </>
          )}
          <div style={{ marginLeft: sm ? "0px" : "85px" }}>
            {/* Source Section */}
            {message?.type === BOT && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "15px",
                  marginInline: "10px",
                }}
              >
                <div>
                  {(selectedIndex > 0
                    ? message?.childAnswers[selectedIndex]?.content?.work_type
                    : message?.content?.work_type) && (
                    <Text
                      fontWeight="bold"
                      style={{ fontSize: sm ? "12px" : "16px" }}
                    >
                      {t("sidebar.source")} : [
                      {message?.childAnswers?.length > 1
                        ? message?.childAnswers[selectedIndex]?.content
                            ?.work_type
                        : message?.content?.work_type}
                      ] {displayIssueCode()}{" "}
                      {message?.childAnswers?.length > 1
                        ? message?.childAnswers[selectedIndex]?.content
                            ?.issue_title
                        : message?.content?.issue_title}
                    </Text>
                  )}
                </div>
                {
                  // selectedIndex > 0
                  // ? message?.childAnswers[selectedIndex]?.content?.page_image
                  // :
                  message?.content?.page_image && (
                    <Button
                      backgroundColor={"white"}
                      border={"1px solid #CDD6DC"}
                      color={"black"}
                      maxWidth={"80px"}
                      height={"28px"}
                      borderRadius={"10px"}
                      padding={"4px"}
                      fontSize={sm ? "12px" : "14px"}
                      fontWeight={"400"}
                      marginLeft={message?.content?.work_type ? "10px" : "0px"}
                      onClick={() => {
                        setSelectedImage({
                          path: `${
                            process.env.REACT_APP_S3_BUCKET_URL_ORIGINAL_IMAGE
                          }page/${
                            // message?.childAnswers?.length > 1
                            //   ? message?.childAnswers[selectedIndex]?.content
                            //       ?.page_image
                            //   :
                            message?.content?.page_image
                          }`,
                        });
                        setImagePopup(true);
                      }}
                    >
                      {t("chats.viewOriginal")}
                    </Button>
                  )
                }
              </div>
            )}

            {/* Like / Dislike action */}
            {message?.type === BOT && message?.content?.tool_use && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: "10px",
                  paddingBottom: "10px",
                  border: "1px solid #E4EBF0",
                  borderRadius: "10px",
                  marginRight: "10px",
                  paddingTop: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: sm ? "100%" : "",
                    gap: sm ? "10px" : "8px",
                    marginInline: sm ? "10px" : "0px",
                    marginLeft: sm ? "10px" : "10px",
                  }}
                >
                  <Button
                    backgroundColor="white"
                    border="1px solid #CDD6DC"
                    color="black"
                    width={sm ? "100%" : "82px"}
                    height="33px"
                    borderRadius="10px"
                    padding="4px"
                    fontSize="12px"
                    fontWeight="400"
                    onClick={() => isLikedMessage(message, 1, LIKED)}
                  >
                    <ThumbsUpIcon
                      // checked={
                      //   message?.childAnswers?.length > 1
                      //     ? message?.childAnswers[selectedIndex]?.is_liked
                      //     : message?.is_liked
                      // }
                      checked={message?.is_liked}
                      style={{ marginRight: "5px" }}
                    />
                    {t("chats.like")}
                  </Button>

                  <Button
                    backgroundColor="white"
                    border="1px solid #CDD6DC"
                    color="black"
                    width={sm ? "100%" : "82px"}
                    height="33px"
                    borderRadius="10px"
                    padding="4px"
                    fontSize="12px"
                    fontWeight="400"
                    onClick={() => isLikedMessage(message, 1, DISLIKED)}
                  >
                    <ThumbsDownIcon
                      // checked={
                      //   message?.childAnswers?.length > 1
                      //     ? message?.childAnswers[selectedIndex]
                      //         ?.is_disliked === undefined
                      //       ? undefined
                      //       : !message?.childAnswers[selectedIndex]?.is_disliked
                      //     : message?.is_disliked === undefined
                      //     ? undefined
                      //     : !message?.is_disliked
                      // }
                      checked={message?.is_disliked}
                      style={{ marginRight: "5px" }}
                    />
                    {t("chats.dislike")}
                  </Button>
                </div>

                <Button
                  backgroundColor={"white"}
                  border={"1px solid #CDD6DC"}
                  color={"black"}
                  width={sm ? "93%" : "82px"}
                  height={"33px"}
                  borderRadius={"10px"}
                  padding={"4px"}
                  fontSize={"12px"}
                  fontWeight={"400"}
                  marginLeft={"10px"}
                  marginTop={sm ? "10px" : "0px"}
                  marginRight={sm ? "10px" : "0px"}
                  onClick={() => {
                    autofocusInput();
                    if (message?.id) {
                      setAdditionalQuestion(message);
                      if (isAdditionalQuestion) setParentChatId(message?.id);
                    }
                  }}
                >
                  <PlusSignIcon />
                  <span style={{ marginLeft: "5px" }}>
                    {t("chats.additionalQuestion")}
                  </span>
                </Button>
              </div>
            )}

            {/* More Answers Section */}
            {message?.content?.unused_documents?.length > 0 && (
              <div
                style={{
                  border: "1px solid #E4EBF0",
                  borderRadius: "8px",
                  marginTop: "20px",
                  display: "block",
                  marginRight: "10px",
                  padding: "16px",
                  gap: "16px",
                }}
              >
                {sm ? (
                  <>
                    <div style={containerStyles}>
                      <BubbleChatQuestion />
                      <span style={{ marginLeft: "7px" }}>
                        {t("chats.moreAnswers")}
                      </span>
                    </div>
                    <span style={furtherAnswersStyles}>
                      {t("chats.furtherAnswers")}
                    </span>
                  </>
                ) : (
                  <div style={containerStyles}>
                    <BubbleChatQuestion />
                    <span style={{ marginLeft: "7px" }}>
                      {t("chats.moreAnswers")}
                    </span>
                    <span style={furtherAnswersStyles}>
                      {t("chats.furtherAnswers")}
                    </span>
                  </div>
                )}

                {message?.content?.unused_documents?.map(
                  (item: any, index: number) => (
                    <AdditionalMessageBox
                      index={index}
                      total={message?.content?.unused_documents?.length}
                      workType={item?.work_type}
                      issueTitle={item?.issue_title}
                      oValue={!testRegex(item?.o_value) && item?.o_value}
                      pValue={!testRegex(item?.p_value) && item?.p_value}
                      qValue={!testRegex(item?.q_value) && item?.q_value}
                      bgColor="#E4EBF0"
                      hover={true}
                      handleClick={() =>
                        handleAdditionalQuestion(item, message)
                      }
                    />
                  )
                )}
              </div>
            )}
          </div>
        </Box>
      </HStack>
    </VStack>
  );
};

export default ChatMessage;
