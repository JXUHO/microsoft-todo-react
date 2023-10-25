import { createSlice } from "@reduxjs/toolkit";

const activeSlice = createSlice({
  name: "active",
  initialState: {activeTasks: [], activeStep: ""},

  reducers: {
    addActiveTasks: (state, action) => {
      //dispatch(addActive(taskId))
      state.activeTasks.push(action.payload);  
    },
    addActiveStep: (state, action) => {
      //dispatch(addActive(taskId))
      state.activeStep = action.payload
    },
    removeActiveTask: (state, action) => {
      // dispatch(removeActiveTask(taskId))
      state.activeTasks = state.activeTasks.filter(task => task !== action.payload)
    },

    initializeActiveTasks: (state) => {
      // dispatch(initializeActiveTask())
      state.activeTasks = []
    },
    initializeActiveStep: (state) => {
      // dispatch(initializeActiveStep())
      state.activeStep = ""
    },
  },
});

export const { addActiveTasks, addActiveStep, removeActiveTask, initializeActiveTasks, initializeActiveStep } = activeSlice.actions;

export default activeSlice.reducer;
