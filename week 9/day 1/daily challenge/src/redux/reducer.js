import { ADD_TASK, DELETE_TASK, EDIT_TASK } from "./actionTypes.js";

const initialState = {
  tasksByDay: {},
};

export default function plannerReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK: {
      const { day, task } = action.payload;
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [day]: [...(state.tasksByDay[day] ?? []), task],
        },
      };
    }
    case EDIT_TASK: {
      const { day, taskId, changes } = action.payload;
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [day]: (state.tasksByDay[day] ?? []).map((task) =>
            task.id === taskId ? { ...task, ...changes } : task,
          ),
        },
      };
    }
    case DELETE_TASK: {
      const { day, taskId } = action.payload;
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [day]: (state.tasksByDay[day] ?? []).filter(
            (task) => task.id !== taskId,
          ),
        },
      };
    }
    default:
      return state;
  }
}
