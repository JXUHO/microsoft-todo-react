import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { sidebar: false, detail: false },
  reducers: {
    openSidebar: (state) => ({ ...state, sidebar: true }),
    closeSidebar: (state) => ({ ...state, sidebar: false }),
    openDetail: (state, action) => ({ ...state, detail: true }),
    closeDetail: (state) => ({ ...state, detail: false }),
  },
});

export const { openSidebar, closeSidebar, openDetail, closeDetail } =
  uiSlice.actions;
export default uiSlice.reducer;