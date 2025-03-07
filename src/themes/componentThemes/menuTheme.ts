import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle((props) => ({
  list: {
    bg: 'primary.500',
    borderColor: 'primary.500',
  },
  item: {
    bg: 'primary.500',
    _hover: {
      bg: 'primary.500',
    },
    _focus: {
      bg: 'primary.500',
    },
  },
}));

export const menuTheme = defineMultiStyleConfig({
  baseStyle,
});
