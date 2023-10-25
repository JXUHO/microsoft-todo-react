import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { sidebar: false, detail: false, contextMenu: false },
  reducers: {
    openSidebar: (state) => ({ ...state, sidebar: true }),
    closeSidebar: (state) => ({ ...state, sidebar: false }),
    openDetail: (state, action) => ({ ...state, detail: true }),
    closeDetail: (state) => ({ ...state, detail: false }),
    openContextMenu: (state) => {
      state.contextMenu = true;
    },
    closeContextMenu: (state) => {
      state.contextMenu = false;
    },
  },
});

export const {
  openSidebar,
  closeSidebar,
  openDetail,
  closeDetail,
  openContextMenu,
  closeContextMenu,
} = uiSlice.actions;
export default uiSlice.reducer;
