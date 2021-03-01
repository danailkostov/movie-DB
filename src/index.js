import { CssBaseline } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./utils/context";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <CssBaseline />
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
