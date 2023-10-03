import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./todoSlice";
import uiSliceReducer from "./uiSlice";
import sortSliceReducer from "./sortSlice"

export default configureStore({
  reducer: {
    todo: todoSliceReducer,
    ui: uiSliceReducer,
    sort: sortSliceReducer
  },
});