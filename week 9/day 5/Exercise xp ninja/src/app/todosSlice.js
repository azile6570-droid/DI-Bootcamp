import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: "todo-1", text: "Make a fresh cup of tea", completed: true },
    { id: "todo-2", text: "Take a short walk outside", completed: false },
    { id: "todo-3", text: "Read a few pages", completed: false },
  ],
  visibilityFilter: "All",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
          },
        };
      },
    },
    toggleTodo(state, action) {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setVisibilityFilter(state, action) {
      state.visibilityFilter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, setVisibilityFilter } = todosSlice.actions;

const selectAllTodos = (state) => state.todos.items;
export const selectVisibilityFilter = (state) => state.todos.visibilityFilter;

export const selectTodos = createSelector(
  [selectAllTodos, selectVisibilityFilter],
  (todos, filter) => {
    if (filter === "Active") return todos.filter((todo) => !todo.completed);
    if (filter === "Completed") return todos.filter((todo) => todo.completed);
    return todos;
  },
);

export const selectFilteredTodosCount = createSelector(
  [selectTodos],
  (todos) => todos.length,
);

export default todosSlice.reducer;
