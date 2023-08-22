import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"
import store from "./store/store";
import { Provider } from "react-redux";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FluentProvider theme={webLightTheme}><Provider store={store}><App /></Provider></FluentProvider>);
