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
        // main: "#058ED9",
        main: "#FFA100",
      },
      secondary: {
        main: "#333333",
      },
      // background: "#F4EBD9"
      category1: "#FFA160",
      category2: "#FF6100",
      category3: "#F9CA1D",
      category4: "#F9301D",
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
