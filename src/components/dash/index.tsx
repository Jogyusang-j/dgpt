import { Box, Flex } from "@chakra-ui/react";
import { ScrollPagination } from "../paginatedChat";
import { Chat } from "../chat";
import { StyledContainer } from "../../dashboards/style";
import { CustomTextarea } from "../Textarea";
import { SendMessageIcon } from "../../assets/icons";
import { useState } from "react";

export const Dash = (chat: IChat) => {
  console.log("chat", JSON.stringify(chat));
  const [input, setInput] = useState("");

  const loading = false;

  const handleClick = () => {
    console.log("handleClick");
  };

  const onChange = () => {};

  const currentChat: any = [
    { id: 1, message: "Ali Akbar" },
    { id: 1, message: "Ali Akbar 2" },
    { id: 1, message: "Ali Akbar69" },
    { id: 1, message: "Ali Akbar" },
    { id: 1, message: "Ali Akbar 2" },
    { id: 1, message: "Ali Akbar69" },
    { id: 1, message: "Ali Akbar" },
    { id: 1, message: "Ali Akbar 2" },
    { id: 1, message: "Ali Akbar69" },
    { id: 1, message: "Ali Akbar" },
    { id: 1, message: "Ali Akbar 2" },
    { id: 1, message: "Ali Akbar69" },
  ];
  const renderComponent = () => {
    return (
      <ScrollPagination
        child={
          <Box display={"flex"} overflowY={"auto"} flex={1}>
            <Flex
              id="chatParent"
              overflowX={"hidden"}
              flex={1}
              flexDirection={"column"}
              gap={"32px"}
            >
              {currentChat?.map((chat: any, index: number) => {
                return <Chat chat={chat} />;
              })}
            </Flex>
          </Box>
        }
        data={currentChat}
        // fetch={fetchThead}
        // hasMore={calculateHasMore(currentChat, maxChatSize)}
        // submitHandler={onSubmit}
      />
    );
  };
  return (
    <StyledContainer>
      {renderComponent()}

      <Box
        borderRadius={"40px"}
        overflow={"hidden"}
        bg={"gray.100"}
        width={"100%"}
        minHeight={"auto"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"space-between"}
      >
        <CustomTextarea
          borderRadius={"40px"}
          bg={"gray.100"}
          minHeight="84px"
          resize="none"
          border={0}
          outline={0}
          padding="28px 150px 28px 32px"
          width="100%"
          maxHeight={"200px"}
          focusBorderColor="transparent"
          EndAdorIcon={
            <Flex gap={"16px"}>
              <SendMessageIcon
                pointerEvents={loading ? "none" : "all"}
                cursor={loading ? "not-allowed" : "pointer"}
                onClick={handleClick}
                color={"#000000"}
              />
            </Flex>
          }
          onChange={onChange}
          value={input}
          // onKeyPress={handleKeyPress}
          loading={loading}
        />
      </Box>
    </StyledContainer>
  );
};
