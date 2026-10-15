import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice.js";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

const STORAGE_KEY = "focus-board-tasks";

store.subscribe(() => {
  const todos = store.getState().todos;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
});
