import { Box, Text } from "@chakra-ui/react";

export const Chat = (chat: IChat) => {
  console.log('chat', JSON.stringify(chat));

  return (
    <Box background={'yellow'} width={'100%'}>
        <Text fontWeight={700} color={'black'}>{chat?.chat?.message}</Text>
    </Box>
  );
};
