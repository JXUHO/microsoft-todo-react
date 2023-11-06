import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebar: false,
    detail: false,
    contextMenu: false,
    dialog: false,
    detailWidth: 360,
    searchbarActive: false,
    appLauncherActive: false,
    accountManagerActive: false
  },
  reducers: {
    openSidebar: (state) => ({ ...state, sidebar: true }),
    closeSidebar: (state) => ({ ...state, sidebar: false }),
    openDetail: (state) => ({ ...state, detail: true }),
    closeDetail: (state) => ({ ...state, detail: false }),
    openContextMenu: (state) => {
      state.contextMenu = true;
    },
    closeContextMenu: (state) => {
      state.contextMenu = false;
    },
    setDialog: (state, action) => {
      state.dialog = action.payload;
    },
    setDetailWidth: (state, action) => {
      state.detailWidth = action.payload;
    },
    setSearchbarActive: (state, action) => {
      state.searchbarActive = action.payload;
    },
    setAppLauncherActive: (state, action) => {
      state.appLauncherActive = action.payload;
    },
    setAccountManagerActive: (state, action) => {
      state.accountManagerActive = action.payload;
    },
    switchAccountManagerActive: (state) => {
      state.accountManagerActive = !state.accountManagerActive;
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
  setSearchbarActive,
  setAppLauncherActive,
  setAccountManagerActive,
  switchAccountManagerActive
} = uiSlice.actions;
export default uiSlice.reducer;
