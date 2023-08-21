import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./todoSlice";
import uiSliceReducer from "./uiSlice";

export default configureStore({
  reducer: {
    todo: todoSliceReducer,
    ui: uiSliceReducer,
  },
});
