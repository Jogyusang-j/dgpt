import { Box, chakra } from "@chakra-ui/react";

export const StyledContainer = chakra(Box, {
  baseStyle: {
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    gap: "32px",
    flex: 1,
    width: { base: "100%", xl: "1235px" },
    padding: "0px 0px 32px 0px",
    margin: "auto",
    paddingTop: "74px",
  },
});
