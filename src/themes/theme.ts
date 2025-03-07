import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";
import { ButtonTheme } from "./componentThemes/ButtonTheme";
import { inputTheme } from "./componentThemes/InputTheme";
import { menuTheme } from './componentThemes/menuTheme';

import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props:any) => ({
    body: {
      color: mode('#18191B', 'white')(props),
      bg: mode('white', '#2F3438')(props),
    },
    '.chakra-menu__menu-list': {
      bg: mode('black', 'white')(props),
      borderColor: mode('white', '#2F3438')(props),
    },
  }),
};

const theme: ComponentStyleConfig = extendTheme({
  styles,
  components: {
    Button: ButtonTheme,
    Input: inputTheme,
    Menu: menuTheme,
  },
  colors: {
    primary: {
      100: "#B6E9E7",
      200: "#0BB4AF",
      300: "#030914",
      400: "#8A3FFC",
      500: '#FFFFFF',
      600: '#000000',
      link:'#5C6670',
      grayText:'#5C6670',
      shineGrayText:'#5C6670',
    },
    green: {
      100: "#006762",
    },
    gray: {
      100: "#F1F6F9",
      200: "#CDD6DC",
      300: "#A7B2BA",
      400: "#E4EBF0",
      500: "#5C6670",
      600: "#E4EBF0",
      700: "#2F3438",
      contactContainer:'#FFFFFF',
      input:'#FFFFFF'
    },
    black: {
      100: "#18191B",
      101: '#000000',
      400: '#F1F6F9'
    },
    white: {
      100: "#FFFFFF",
    },
    danger: {
      100: "#FFEEF1",
      900: "#EE3D5D",
    },
    success:{
      100: '#54CBC7'
    },
    menu: {
      100: '#0000FF',
      200: "#EBECEF",
      300: '#EBECEF'
    },
    inverse:{
      black:"#18191B",
      gray:'#FFFFFF'
    },
    border:{
      inverseGray:'#F1F6F9'
    },
    theme: {
      text: {
        primaryDark: "#18191B",
      },
      button: {
        primary: "#1782FF",
      },
      white: "#FFFFFF",
      brown: {
        100: "rgba(141, 145, 158, 0.1)",
      },
      primary: {
        100: "#E8EEFD",
      },
      gray: {
        100: "#E4EBF0",
        200: "#CDD6DC",
        300: "#A7B2BA",
        400: "#798692",
        500: "#5C6670",
        600: "#40464B",
        700:'#2F3438',
        lightGray700: "#FFFFFF",
        lightGray500: "#5C6670",
        lightGray500to200: "#5C6670",
        zeroGray:'#F1F6F9',
      },
      danger: {
        100: "#FFEEF1",
        900: "#EE3D5D",
      },
      alert: {
        100: 'rgba(80, 183, 240, 0.2)',
        200: 'rgba(23, 130, 255, 0.2)',
        900: '#50B7F0'
      },
      bg: {
        container: '#F6F8FC',
        yallow:"#F6C23A",
        box:'#FFF'
      }
    },
  },
  breakpoints: {
    sm: "600px",
    md: "900px",
    lg: "1250px",
    xl: "1600px",
    "2xl": "1920px",
  },
});

export default theme;
