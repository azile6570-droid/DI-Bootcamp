import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const TODOS_ENDPOINT = "https://jsonplaceholder.typicode.com/todos?_limit=6";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { dispatch, rejectWithValue }) => {
    let response;

    try {
      response = await fetch(TODOS_ENDPOINT);
    } catch {
      return rejectWithValue("Could not reach the todos service. Check your connection and try again.");
    }

    if (!response.ok) {
      return rejectWithValue(`Could not load todos (HTTP ${response.status}). Please try again.`);
    }

    let data;
    try {
      data = await response.json();
    } catch {
      return rejectWithValue("The todos service returned an unreadable response. Please try again.");
    }

    if (!Array.isArray(data)) {
      return rejectWithValue("The todos service returned data in an unexpected format.");
    }

    const todos = data.map((todo) => ({
      id: todo.id,
      text: todo.title,
      completed: todo.completed,
    }));
    dispatch(setTodos(todos));
    return todos;
  },
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      const text = action.payload?.trim();
      if (!text) return;

      state.todos.unshift({
        id: crypto.randomUUID(),
        text,
        completed: false,
      });
      state.error = null;
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unable to fetch todos.";
      });
  },
});

export const { addTodo, removeTodo, toggleTodo, setTodos } = todosSlice.actions;
export default todosSlice.reducer;
