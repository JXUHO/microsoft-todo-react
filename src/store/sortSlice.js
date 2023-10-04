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

    setSortBy: (state, action) => {
      const { option, location } = action.payload;
      state[location].sortBy = option;
    },


    changeOrder: (state, action) => {
      // dispatch(changeOrder(myday))
      const location = action.payload;
      if (state[location].order === "descending") {
        state[location].order = "ascending";
      } else {
        state[location].order = "descending";
      }
    },
    initializeState: (state, action) => {
      // dispatch(initializeState(myday))
      const location = action.payload;
      state[location] = { sortBy: "", order: "descending" };
    },
  },
});

export const { setSortBy, changeOrder, initializeState } = sortSlice.actions;

export default sortSlice.reducer;
