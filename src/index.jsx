import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./store/store";
import { Provider } from "react-redux";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./api/apiSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ApiProvider api={apiSlice}>
    <Provider store={store}>
      <App />
    </Provider>
  // </ApiProvider>
);
