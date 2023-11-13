import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./todoSlice";
import uiSliceReducer from "./uiSlice";
import sortSliceReducer from "./sortSlice"
import groupSliceReducer from "./groupSlice"
import activeSliceReducer from "./activeSlice"
import searchSliceReducer from "./searchSlice";
import modifierSliceReducer from "./modifierSlice";

import { apiSlice } from "../api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";


// export default configureStore({
export const store =  configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    todo: todoSliceReducer,
    ui: uiSliceReducer,
    sort: sortSliceReducer,
    group: groupSliceReducer,
    active: activeSliceReducer,
    search: searchSliceReducer,
    modifier: modifierSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), 
});


setupListeners(store.dispatch)

export default store