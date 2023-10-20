import { createSlice } from "@reduxjs/toolkit";

const activeSlice = createSlice({
  name: "active",
  initialState: {activeTask: "", activeStep: ""},

  reducers: {
    addActiveTask: (state, action) => {
      //dispatch(addActive(taskId))
      state.activeTask = action.payload
    },
    addActiveStep: (state, action) => {
      //dispatch(addActive(taskId))
      state.activeStep = action.payload
    },
    initializeActive: (state) => {
      // dispatch(initializeActive())
      state.activeTask = ""
      state.activeStep = ""
    },
  },
});

export const { addActiveTask, addActiveStep, initializeActive } = activeSlice.actions;

export default activeSlice.reducer;
