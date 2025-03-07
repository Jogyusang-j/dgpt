import { useState, useRef, useEffect } from "react";
import {
  Box,
  Input,
  Spinner,
  Card,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import "../../styles/Chatbot.css";
import * as microsoftTeams from "@microsoft/teams-js";
import { useNavigate, useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { SuggestedQuestions } from "../suggested-questions";
import { ChatsIntro } from "../chats-intro";
import Breakpoints from "../mediaQuery";
import ChatInput from "../chatInput";
import { ChevronUpIcon } from "../../assets/icons";
import { SendButton } from "../../assets/images/sendButton";

export const EmptyChatbot = () => {
  const { sm, md, lg } = Breakpoints();
  const params = useParams();
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | undefined>("");
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

  const handleClick = (event: any) => {
    if (loading) return;

    if (event.type === "keydown" && event.key !== "Enter") {
      return;
    }

    if (userInput)
      // Navigate with the userMessage as a query parameter
      navigate({
        pathname: "/messages",
        search: userInput,
      });
  };

  const handleInputChange = (event: any) => {
    setUserInput(event.target.value);
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
              id: item.id,
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
              id: item.id,
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

  const renderSugeestedQuestions = () => {
    return (
      <SuggestedQuestions
        userId={userId}
        userInput={userInput}
        setUserInput={setUserInput}
        setLoading={setLoading}
      />
    );
  };

  const renderChatsIntro = () => {
    return <ChatsIntro />;
  };

  const renderChatsSend = () => {
    if (loading) {
      return <Spinner size={"sm"} style={{ marginRight: "15px" }} />;
    }
    return (
      <div style={{ marginRight: "15px" }} onClick={handleClick}>
        <SendButton
          active={userInput}
          width={sm || md || lg ? "24" : "32"}
          height={sm || md || lg ? "24" : "32"}
        />
      </div>
    );
  };

  return (
    <Box
      overflowY={"auto"}
      style={{
        display: "flex",
        flexDirection: sm || md || lg ? "column" : "row",
        justifyContent: sm || md || lg ? "space-between" : "center",
        alignItems: "center",
        height: "calc(100%  - 40px)",
        marginTop: sm || md || lg ? "20px" : "0px",
        overflowX: sm || md || lg ? "hidden" : "scroll",
      }}
    >
      <Card
        width={sm ? 300 : md ? 400 : lg ? 500 : 700}
        minWidth={300}
        minH={448}
        borderRadius={"16px"}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          {renderChatsIntro()}
          {renderSugeestedQuestions()}
          {!(sm || md || lg) && (
            <ChatInput
              sm={sm}
              placeholder={t("chats.ask")}
              loading={loading}
              handleInputChange={handleInputChange}
              handleClick={handleClick}
              renderChatsSend={renderChatsSend}
            />
          )}
        </div>
      </Card>
      {(sm || md || lg) && (
        <div style={{ marginBottom: "10px", width: "100%" }}>
          <ChatInput
            placeholder={t("chats.ask")}
            loading={loading}
            handleInputChange={handleInputChange}
            handleClick={handleClick}
            renderChatsSend={renderChatsSend}
          />
        </div>
      )}
    </Box>
  );
};
