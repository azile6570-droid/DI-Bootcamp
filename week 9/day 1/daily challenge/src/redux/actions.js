import { ADD_TASK, DELETE_TASK, EDIT_TASK } from "./actionTypes.js";

export function addTask(day, task) {
  return {
    type: ADD_TASK,
    payload: {
      day,
      task: {
        ...task,
        id: globalThis.crypto.randomUUID(),
      },
    },
  };
}

export function editTask(day, taskId, changes) {
  return {
    type: EDIT_TASK,
    payload: { day, taskId, changes },
  };
}

export function deleteTask(day, taskId) {
  return {
    type: DELETE_TASK,
    payload: { day, taskId },
  };
}
