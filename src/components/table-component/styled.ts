import {
  Box,
  HStack,
  TableContainer,
  chakra,
} from "@chakra-ui/react";

const CustomTableContainer = chakra(TableContainer, {
  baseStyle: {
    border: "1px solid",
    borderColor: "gray.400",
    borderRadius: "12px 12px 0px 0px",
    borderBottom: 0,
    borderLeft: 0,
    width: {base:"100%",xl:"1164px"}, 
   },
});

const StyledChatTableContainer = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    overflow:'auto'
  },
});

const StyledPaginationContainer = chakra(HStack, {
  baseStyle: {
    width:'100%',
    overflow:"hidden",
    justifyContent:'flex-end',
    alignItems:'center',
    marginBottom: 10,
  },
});

export {
  CustomTableContainer,
  StyledChatTableContainer,
  StyledPaginationContainer,
};
