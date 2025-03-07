import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";
import { ButtonTheme } from "./componentThemes/ButtonTheme";
import { inputTheme } from "./componentThemes/InputTheme";
import { mode } from "@chakra-ui/theme-tools";
import { menuTheme } from "./componentThemes/menuTheme";

const styles = {
  global: (props: any) => ({
    body: {
      color: mode("#18191B", "white")(props),
      bg: mode("white", "#2F3438")(props),
    },
    ".chakra-menu__menu-list": {
      bg: mode("black", "white")(props),
      borderColor: mode("white", "#2F3438")(props),
    },
  }),
};
const darkTheme: ComponentStyleConfig = extendTheme({
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
      500: "#2F3438",
      600: '#FFFFFF',
      link: "#0BB4AF",
      grayText: "#FFFFFF",
      shineGrayText:'#FFFFFF',
    },
    green: {
      100: "#006762",
    },
    gray: {
      100: "#40464B",
      200: "#CDD6DC",
      300: "#A7B2BA",
      400: "#5C6670",
      500: "#5C6670",
      600: "#40464B",
      700: "#FFFFFF",
      contactContainer:'#40464B',
      input:'#798692'
    },
    black: {
      100: "#18191B",
      101: "#000000",
      400: "#40464B",
    },
    white: {
      100: "#FFFFFF",
    },
    blue: {
      100: "#2551B3",
    },
    danger: {
      100: "#FFEEF1",
      900: "#EE3D5D",
    },
    success: {
      100: "#54CBC7",
    },
    menu: {
      100: "#FFFFFF",
      200: "#2A2D31",
      300: "#26292D",
    },
    inverse:{
      black:"#FFFFFF",
      gray:'#40464B'
    },
    border:{
      inverseGray:'transparent'
    },
    theme: {
      text: {
        primaryDark: "#FFF",
      },
      button: {
        primary: "#1782FF",
      },
      white: "#18191B",
      brown: {
        100: "rgba(141, 145, 158, 0.1)",
      },
      primary: {
        100: "#E8EEFD",
      },
      gray: {
        100: "#E4EBF0",
        200: "#40464B",
        300: "#A7B2BA",
        400: "#798692",
        500: "#5C6670",
        600: "#40464B",
        700: '#2F3438',
        lightGray700: "#2F3438",
        zeroGray:'#F1F6F9',
        lightGray500: "#FFFFFF",
        lightGray500to200: "#CDD6DC",
      },
      danger: {
        100: "#FFEEF1",
        900: "#EE3D5D",
      },
      alert: {
        100: 'rgba(141, 145, 158, 0.1)',
        200: 'rgba(23, 130, 255, 0.2)',
        900: '#50B7F0'
      },
      bg: {
        container: '#2F3438',
        yallow:"#F6C23A",
        box:"#2F3438"
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

export default darkTheme;
