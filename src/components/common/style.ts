import { Box, chakra, Flex } from "@chakra-ui/react";

export const StyledDashboardLayoutChildContainer = chakra(Box, {
  baseStyle: {
    width: "100%",
    overflowY: "auto",
    position: "relative",
    left: "0",
    display: "flex",
    flexDirection: "column",
    borderColor: "gray.600",
    flex:1
  },
});

export const ColumnFlex = chakra(Flex, {
  baseStyle: {
    flexDir: "column",
  },
});