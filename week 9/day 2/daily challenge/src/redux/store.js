import { createStore } from "redux";
import plannerReducer from "./reducer.js";

const storageKey = "daylight-planner-state";

function loadSavedState() {
  if (typeof window === "undefined") return undefined;

  try {
    const savedState = window.localStorage.getItem(storageKey);
    if (!savedState) return undefined;

    const parsedState = JSON.parse(savedState);
    if (
      !parsedState ||
      typeof parsedState !== "object" ||
      Array.isArray(parsedState) ||
      !parsedState.tasksByDay ||
      typeof parsedState.tasksByDay !== "object" ||
      Array.isArray(parsedState.tasksByDay)
    ) {
      throw new Error("Saved planner data has an invalid format.");
    }

    return { tasksByDay: parsedState.tasksByDay };
  } catch (error) {
    console.error("Unable to load saved planner data.", error);
    return undefined;
  }
}

export const store = createStore(plannerReducer, loadSavedState());

if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(store.getState()));
    } catch (error) {
      console.error("Unable to save planner data.", error);
    }
  });
}
