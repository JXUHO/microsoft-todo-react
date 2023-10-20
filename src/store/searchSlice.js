import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {query: "", showCompleted: false},

  reducers: {
    addQuery: (state, action) => {
      //dispatch(addQuery("query"))
      state.query = action.payload
    },
    initializeQuery: (state) => {
      // dispatch(initializeQuery())
      state.query = ""
    },
    switchShowCompleted: (state) => {
      state.showCompleted = !state.showCompleted
    }
  },
});

export const { addQuery, initializeQuery, switchShowCompleted } = searchSlice.actions;

export default searchSlice.reducer;
