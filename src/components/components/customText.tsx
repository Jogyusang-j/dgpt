import { Text, TextProps } from "@chakra-ui/react";

interface ICustomText extends TextProps {
  text?: string;
  type?: "basicText" | "grayText" | "primary" | "purpleText";
  isEllipse?: boolean;
  gradient?: boolean;
  padding?: string | number;
  margin?: string | number;
  lineHeight?: string | number;
}

export const CustomText = (props: ICustomText) => {
  const {
    text,
    color,
    type = "basicText",
    fontWeight = 400,
    fontSize = "14px",
    gradient = false,
    isEllipse = false,
    paddingTop = "0",
    paddingBottom = "0",
    margin = "0",
    lineHeight = "normal",
    ...rest
  } = props;

  return (
    <Text
      color={
        gradient
          ? "transparent"
          : color || type === "basicText"
          ? "theme.text.primaryDark"
          : type === "grayText"
          ? "theme.gray.500"
          : type === "primary"
          ? "theme.button.primary"
          : type === "purpleText"
          ? "purple.500" 
          : "theme.white"
      }
      fontSize={fontSize}
      fontWeight={fontWeight}
      isTruncated={isEllipse}
      maxWidth={isEllipse ? "200px" : "unset"}
      whiteSpace={isEllipse ? "nowrap" : "normal"}
      overflow={isEllipse ? "hidden" : "visible"}
      textOverflow={isEllipse ? "ellipsis" : "unset"}
      background={
        gradient
          ? "linear-gradient(90deg, #6950F3 36.15%, #AE40E0 64.08%)"
          : undefined
      }
      backgroundClip={gradient ? "text" : undefined}
      webkitBackgroundClip={gradient ? "text" : undefined}
      pt={paddingTop}
      pb={paddingBottom}
      lineHeight={lineHeight}
      {...rest}
    >
      {text}
    </Text>
  );
};
