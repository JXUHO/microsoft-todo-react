import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sortOption",
  initialState: {
    myday: { sortBy: "", order: "descending" },
    important: { sortBy: "", order: "descending" },
    completed: { sortBy: "", order: "descending" },
    tasks: { sortBy: "", order: "descending" },

  },
  reducers: {
    setSortBy: (state, action) => {  // dispatch(setSortBy({option: "importance", location: location.pathname}))
      console.log("sortSlice setSortBy triggered")
      const location = action.payload.location.slice(1)
      state[location].sortBy = action.payload.option;
    },
    changeOrder: (state, action) => {  // dispatch(changeOrder(location.pathname))
      const location = action.payload.slice(1)
      if (state[location].order === 'descending') {
        state[location].order = 'ascending'
      } else {
        state[location].order = 'descending'
      }
    },
    initializeState: (state, action) => {  // dispatch(initializeState(location.pathname))
      const location = action.payload.slice(1)
      state[location] = { sortBy: "", order: "descending" };
    },
  },
});

export const { setSortBy, changeOrder, initializeState } = sortSlice.actions;

export default sortSlice.reducer;
