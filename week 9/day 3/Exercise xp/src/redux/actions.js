import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from "./actionTypes.js";

export function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: {
      id: globalThis.crypto.randomUUID(),
      text,
    },
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: id,
  };
}

export function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    payload: id,
  };
}
