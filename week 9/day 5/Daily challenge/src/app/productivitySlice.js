import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    { id: "cat-focus", name: "Focus" },
    { id: "cat-wellbeing", name: "Wellbeing" },
    { id: "cat-home", name: "Home" },
  ],
  tasks: [
    {
      id: "task-plan",
      title: "Plan the week ahead",
      notes: "Choose three priorities for the days ahead.",
      categoryId: "cat-focus",
      progress: 100,
      completed: true,
    },
    {
      id: "task-walk",
      title: "Take a screen-free walk",
      notes: "A little fresh air and a change of pace.",
      categoryId: "cat-wellbeing",
      progress: 65,
      completed: false,
    },
    {
      id: "task-desk",
      title: "Clear and reset the desk",
      notes: "Make space for the next good idea.",
      categoryId: "cat-home",
      progress: 25,
      completed: false,
    },
  ],
};

const productivitySlice = createSlice({
  name: "productivity",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.unshift(action.payload);
      },
      prepare({ title, notes = "", categoryId = null }) {
        return {
          payload: {
            id: nanoid(),
            title: title.trim(),
            notes: notes.trim(),
            categoryId,
            progress: 0,
            completed: false,
          },
        };
      },
    },
    editTask(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload.id);
      if (!task) return;

      if (typeof action.payload.title === "string" && action.payload.title.trim()) {
        task.title = action.payload.title.trim();
      }
      if (typeof action.payload.notes === "string") {
        task.notes = action.payload.notes.trim();
      }
      if (Object.hasOwn(action.payload, "categoryId")) {
        task.categoryId = action.payload.categoryId;
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskProgress(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload.id);
      if (!task) return;

      const progress = Math.max(0, Math.min(100, Math.round(action.payload.progress)));
      task.progress = progress;
      task.completed = progress === 100;
    },
    toggleTaskCompleted(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (!task) return;

      task.completed = !task.completed;
      task.progress = task.completed ? 100 : 0;
    },
    addCategory: {
      reducer(state, action) {
        state.categories.push(action.payload);
      },
      prepare(name) {
        return {
          payload: {
            id: nanoid(),
            name: name.trim(),
          },
        };
      },
    },
    editCategory(state, action) {
      const category = state.categories.find((item) => item.id === action.payload.id);
      if (category && action.payload.name.trim()) {
        category.name = action.payload.name.trim();
      }
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
      state.tasks.forEach((task) => {
        if (task.categoryId === action.payload) {
          task.categoryId = null;
        }
      });
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  updateTaskProgress,
  toggleTaskCompleted,
  addCategory,
  editCategory,
  deleteCategory,
} = productivitySlice.actions;

export const selectCategories = (state) => state.productivity.categories;
const selectAllTasks = (state) => state.productivity.tasks;

export const selectTasksByCategory = createSelector(
  [selectAllTasks, (_state, categoryId) => categoryId],
  (tasks, categoryId) => {
    if (categoryId === "all") return tasks;
    if (categoryId === "uncategorized") return tasks.filter((task) => task.categoryId === null);
    return tasks.filter((task) => task.categoryId === categoryId);
  },
);

export const selectCompletedTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((task) => task.completed).length,
);

export const selectCategoryById = createSelector(
  [selectCategories, (_state, categoryId) => categoryId],
  (categories, categoryId) => categories.find((category) => category.id === categoryId),
);

export default productivitySlice.reducer;
