import { createSlice } from "@reduxjs/toolkit";

const activeSlice = createSlice({
  name: "active",
  initialState: {active: ""},

  reducers: {
    addActive: (state, action) => {
      //dispatch(addActive(taskId))
      state.active = action.payload
    },
    initializeActive: (state, action) => {
      // dispatch(initializeActive())
      state.active = ""
    },
  },
});

export const { addActive, initializeActive } = activeSlice.actions;

export default activeSlice.reducer;
