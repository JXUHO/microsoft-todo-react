import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./todoSlice";
import uiSliceReducer from "./uiSlice";
import sortSliceReducer from "./sortSlice"
import groupSliceReducer from "./groupSlice"
import activeSliceReducer from "./activeSlice"

export default configureStore({
  reducer: {
    todo: todoSliceReducer,
    ui: uiSliceReducer,
    sort: sortSliceReducer,
    group: groupSliceReducer,
    active: activeSliceReducer,
  },
});