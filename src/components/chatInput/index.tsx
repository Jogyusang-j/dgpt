import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import Breakpoints from "../mediaQuery";

const ChatInput = ({
  placeholder,
  loading,
  handleInputChange,
  handleClick,
  renderChatsSend,
}: any) => {
  const { sm, md, lg } = Breakpoints();

  return (
    <Box
      display="flex"
      width={"100%"}
      alignItems="center"
      marginInline={sm || md || lg ? "10px" : "40px"}
    >
      <InputGroup
        style={{
          marginTop: "30px",
          marginInline: sm || md || lg ? "10px" : "15px",
        }}
      >
        <Input
          placeholder={placeholder}
          flex={1}
          width={"100%"}
          height={"64px"}
          borderRadius={"16px"}
          style={{
            backgroundColor: "#E9E9EE",
            border: "1px solid #E7E7E9",
            color: "#18191B",
          }}
          sx={{
            "::-webkit-input-placeholder": { color: "#18191B" }, // For Webkit-based browsers
            "::-moz-placeholder": { color: "#18191B" }, // For Firefox 19+
            ":-ms-input-placeholder": { color: "#18191B" }, // For IE
            "::-ms-input-placeholder": { color: "#18191B" }, // For Edge
            "::placeholder": { color: "#18191B" }, // Standard placeholder styling
          }}
          disabled={loading}
          onChange={handleInputChange}
          onKeyDown={handleClick}
        />
        <InputRightElement height="100%">{renderChatsSend()}</InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default ChatInput;
