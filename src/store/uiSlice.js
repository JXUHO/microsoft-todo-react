import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { sidebar: false, detail: false, contextMenu: false, dialog: false, detailWidth: 360},
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
    setDialog: (state, action) => {
      state.dialog = action.payload
    },
    setDetailWidth: (state, action) => {
      state.detailWidth = action.payload
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
  setDialog,
  setDetailWidth,
} = uiSlice.actions;
export default uiSlice.reducer;
