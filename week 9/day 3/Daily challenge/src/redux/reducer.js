import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasksByDay: {},
};

const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const { day, task } = action.payload;
        (state.tasksByDay[day] ??= []).push(task);
      },
      prepare(day, task) {
        return {
          payload: {
            day,
            task: { ...task, id: nanoid() },
          },
        };
      },
    },
    editTask(state, action) {
      const { day, taskId, changes } = action.payload;
      const task = state.tasksByDay[day]?.find((item) => item.id === taskId);
      if (task) Object.assign(task, changes);
    },
    deleteTask(state, action) {
      const { day, taskId } = action.payload;
      const tasks = state.tasksByDay[day];
      if (tasks) {
        state.tasksByDay[day] = tasks.filter((task) => task.id !== taskId);
      }
    },
  },
});

export const { addTask, editTask, deleteTask } = plannerSlice.actions;
export default plannerSlice.reducer;
