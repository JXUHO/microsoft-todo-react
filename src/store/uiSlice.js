import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { sidebar: false, detail: false, id: "" },
  reducers: {
    openSidebar: (state) => ({ ...state, sidebar: true }),
    closeSidebar: (state) => ({ ...state, sidebar: false }),
    openDetail: (state, action) => ({ ...state, detail: true, id: action.payload }),
    closeDetail: (state) => ({ ...state, detail: false, id: "" }),
  },
});

export const { openSidebar, closeSidebar, openDetail, closeDetail } =
  uiSlice.actions;
export default uiSlice.reducer;
