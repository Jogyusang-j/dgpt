import { Box, chakra } from "@chakra-ui/react";

export const StyledTextareaContainer = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    position: "relative",
    flexDir:'column'
  },
});
