import {
  Flex,
  FlexProps,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface ChatHeaderProps extends FlexProps {
  title?: any;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: () => void;
  showRightInput?: boolean;
  onDateSelect?: any;
  onClear?: any;
  dates?: any;
}

export const AppHeader: React.FC<ChatHeaderProps> = ({
  onSearchChange,
  onKeyDown,
  title,
  showRightInput = false,
  onDateSelect,
  onClear,
  dates,
  ...props
}) => {
  const { t } = useTranslation("common");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (typeof onKeyDown === "function") {
        onKeyDown();
      }
    }
  };


  return (
    <Flex
      display={"flex"}
      gap={"10px"}
      width="100%"
      justifyContent={"space-between"}
      alignContent={"center"}
      borderColor={"gray.600"}
      backgroundColor="trasparent"
      {...props}
    >
      <Spacer />

      {showRightInput && (
        <InputGroup maxW={"220px"} height={"50px"} backgroundColor="white">
          <InputRightElement
            cursor={"pointer"}
          />
          <Input
            placeholder={t("chat.search")}
            onChange={onSearchChange}
            onKeyDown={handleKeyDown}
            variant="outline"
            size="xs"
            height={"50px"}
          />
        </InputGroup>
      )}
    </Flex>
  );
};

export default AppHeader;
