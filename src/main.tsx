import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { Talkr } from "talkr";
import App from "./App";
import en from "./i18n/en.json";
import th from "./i18n/th.json";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Talkr languages={{ en, th }} defaultLanguage="en">
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <App />
      </StyledEngineProvider>
    </Talkr>
  </React.StrictMode>
);
