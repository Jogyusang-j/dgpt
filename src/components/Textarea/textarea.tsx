import { Box, Textarea } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { StyledTextareaContainer } from "./style";

const CustomTextarea = (props: any) => {
  const {
    EndAdorIcon,
    borderRadius = "40px",
    onChange,
    value,
    onRightAdorClick,
    loading,
    ...restProps
  } = props;
  const textareaRef: any = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef.current?.scrollHeight]);

  return (
    <StyledTextareaContainer>
      <Textarea
        rows={1}
        ref={textareaRef}
        value={value}
        placeholder={"chat.enterText"}
        borderRadius={borderRadius}
        position={"relative"}
        zIndex={0}
        {...restProps}
      />
      {EndAdorIcon && (
        <Box
          onClick={onRightAdorClick}
          style={{
            position: "absolute",
            bottom: "28px",
            right: "32px",
            zIndex: 1,
          }}
        >
          {EndAdorIcon}
        </Box>
      )}
    </StyledTextareaContainer>
  );
};

export { CustomTextarea };
