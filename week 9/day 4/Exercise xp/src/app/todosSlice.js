import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "focus-board-tasks";

const loadInitialState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { id: crypto.randomUUID(), text: "Review project brief", completed: false },
      { id: crypto.randomUUID(), text: "Draft a plan for the next sprint", completed: true },
      { id: crypto.randomUUID(), text: "Send updates to the team", completed: false },
    ];
  } catch {
    return [];
  }
};

const todosSlice = createSlice({
  name: "todos",
  initialState: loadInitialState(),
  reducers: {
    addTodo: (state, action) => {
      const text = action.payload?.trim();
      if (!text) return;

      state.push({
        id: crypto.randomUUID(),
        text,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearCompleted: (state) => {
      return state.filter((item) => !item.completed);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
