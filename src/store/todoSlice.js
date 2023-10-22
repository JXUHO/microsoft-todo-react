import { createSlice } from "@reduxjs/toolkit";
import { isDateToday } from "../utils/getDates";
import getNextRepeatTask, { repeatDueSynchronizer } from "../utils/repeatTask";

const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: [] },
  reducers: {
    addTodo: (state, action) => {
      const modifiedDue = repeatDueSynchronizer(action.payload);
      if (modifiedDue) {
        action.payload = {
          ...action.payload,
          dueDate: modifiedDue.toISOString(),
        };
      }

      if (!action.payload.myday) {
        if (isDateToday(new Date(action.payload.dueDate))) {
          state.todos.push({ ...action.payload, myday: true });
        } else {
          state.todos.push({ ...action.payload, myday: false });
        }
      } else {
        state.todos.push(action.payload);
      }
    },

    completeTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (todoToChange.complete) {
        todoToChange.complete = "";
      } else {
        todoToChange.complete = new Date().toISOString();
        if (todoToChange.repeatRule && !todoToChange.repeated) {
          // repeatRule존재하면, 새로운 repeat task 생성
          todoToChange.repeated = true;
          state.todos.push(getNextRepeatTask(todoToChange));
        }
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
    changeDueDateTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      todoToChange.dueDate = action.payload.dueDate;
    },
    changeTaskTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      todoToChange.task = action.payload.task;
    },
    changeMydayTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload
      );
      todoToChange.myday = !todoToChange.myday;
    },

    // detail에서 변경한 due, repeat충돌할 때, 조정해야함
    changeOptionTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      todoToChange[action.payload.option] = action.payload.content;
    },

    addCategoryTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      todoToChange.category.push(action.payload.category);
    },
    removeCategoryTodo: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      todoToChange.category = todoToChange.category.filter(
        (element) => element !== action.payload.category
      );
    },
    addNoteTodo: (state, action) => {
      // dispatch(addNoteTodo(id:"", content:""))
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      todoToChange.note = {
        content: action.payload.content,
        updated: new Date().toISOString(),
      };
    },
    plannedAddTodo: (state, action) => {
      if (!action.payload.dueDate) {
        state.todos.push({
          ...action.payload,
          dueDate: new Date().toISOString(),
        });
      } else {
        state.todos.push(action.payload);
      }
    },

    updateMydayTodo: (state) => {
      state.todos.map((todo) => {
        if (
          !isDateToday(new Date(todo.created)) &&
          todo.myday &&
          !isDateToday(new Date(todo.dueDate))
        ) {
          todo.myday = false;
        } else if (
          !isDateToday(new Date(todo.created)) &&
          isDateToday(new Date(todo.dueDate))
        ) {
          todo.myday = true;
        }
      });
    },

    addStep: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      todoToChange.steps.push(action.payload.step);
    },
    completeStep: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload.taskId
      );
      const stepToChange = todoToChange.steps.find(
        (step) => step.id === action.payload.stepId
      );
      stepToChange.complete = !stepToChange.complete;
    },
    removeStep: (state, action) => {
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload.taskId
      );
      todoToChange.steps = todoToChange.steps.filter(
        (step) => step.id !== action.payload.stepId
      );
    },
    changeStep: (state, action) => {
      //dispatch(changeStep({taskId, stepId: step.id, content: ""}))
      const todoToChange = state.todos.find(
        (todo) => todo.id === action.payload.taskId
      );
      const stepToChange = todoToChange.steps.find(
        (step) => step.id === action.payload.stepId
      );
      stepToChange.content = action.payload.content;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  completeTodo,
  importanceTodo,
  changeDueDateTodo,
  changeTaskTodo,
  changeMydayTodo,
  changeOptionTodo,
  addCategoryTodo,
  removeCategoryTodo,
  addNoteTodo,
  plannedAddTodo,
  updateMydayTodo,

  addStep,
  completeStep,
  removeStep,
  changeStep,
} = todoSlice.actions;
export default todoSlice.reducer;
