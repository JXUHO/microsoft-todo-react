import { createSlice } from "@reduxjs/toolkit";

const activeSlice = createSlice({
  name: "active",
  initialState: {activeTask: "", activeStep: ""},

  reducers: {
    addActiveTask: (state, action) => {
      //dispatch(addActive(taskId))
      state.activeTask = action.payload;  
    },
    addActiveStep: (state, action) => {
      //dispatch(addActive(taskId))
      state.activeStep = action.payload
    },
    initializeActiveTask: (state) => {
      // dispatch(initializeActiveTask())
      state.activeTask = ""
    },
    initializeActiveStep: (state) => {
      // dispatch(initializeActiveStep())
      state.activeStep = ""
    },
  },
});

export const { addActiveTask, addActiveStep, initializeActiveTask, initializeActiveStep } = activeSlice.actions;

export default activeSlice.reducer;
