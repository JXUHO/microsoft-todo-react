import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: [], },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    completeTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (todoToChange.complete) {
        todoToChange.complete = ""
      } else {
        todoToChange.complete = new Date().toISOString()
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    importanceTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload
      );
      todoToChange.importance = !todoToChange.importance;

      const index = state.todos.indexOf(todoToChange);
      if (index !== -1 && todoToChange.importance) {
        state.todos.splice(index, 1); // Remove the element from its current position
        state.todos.push(todoToChange); // Add it to the last
      }
    },
    repeatedTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload
      );
      todoToChange.repeated = !todoToChange.repeated;
    },
    changeDueDateTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      todoToChange.dueDate = action.payload.dueDate;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  completeTodo,
  importanceTodo,
  repeatedTodo,
  changeDueDateTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
