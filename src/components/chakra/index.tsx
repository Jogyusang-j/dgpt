import { ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import {
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
} from "@fluentui/react-components";
import { useTeams } from "@microsoft/teamsfx-react";
import darkTheme from '../../themes/darkTheme';

export const ChakraWrapper: React.FC<any> = ({
  children,
  ...rest
}) => {
  const { themeString } = useTeams()[0];


  return (
    <ChakraProvider
    theme={themeString === "dark" ? darkTheme : theme}

    // theme={themeString === "dark"
    // ? teamsDarkTheme
    // : themeString === "contrast"
    // ? teamsHighContrastTheme
    // : teamsLightTheme}
      { ...rest }
    >
      { children }
    </ChakraProvider>
  );
};
