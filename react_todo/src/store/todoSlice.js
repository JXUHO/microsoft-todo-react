import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
  name: "todos",
  initialState: {todos: []},
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos.filter((todo) => todo !== action.payload)
    }
  }

})

export const {addTodo, removeTodo} = todoSlice.actions;
export default todoSlice.reducer;