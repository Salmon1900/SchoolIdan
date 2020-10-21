import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const RTL = (props) => {
  const theme = createMuiTheme({
    direction: "rtl",
    palette: {
      primary: {
        main: "#058ED9",
      },
      secondary: {
        main: "#333333",
      },
      // background: "#F4EBD9"
    },
    typography: {
      fontFamily: "sans-serif",
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider jss={jss}>{props.children}</StylesProvider>
    </MuiThemeProvider>
  );
};

export default RTL;
