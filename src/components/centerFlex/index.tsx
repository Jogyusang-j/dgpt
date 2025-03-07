import { Flex, chakra } from "@chakra-ui/react";
const CenterFlex = chakra(Flex, {
  baseStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export { CenterFlex };
