import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    completeTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload
      );
      todoToChange.complete = !todoToChange.complete;
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },  
    importanceTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload
      );
      todoToChange.importance = !todoToChange.importance;
    },
    repeatedTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload
      );
      todoToChange.repeated = !todoToChange.repeated
    },
    updateTodos: (state, action) => {
      state.todos = action.payload;
    }
  },
});

export const { addTodo, removeTodo, completeTodo, importanceTodo, updateTodos, repeatedTodo } = todoSlice.actions;
export default todoSlice.reducer;
