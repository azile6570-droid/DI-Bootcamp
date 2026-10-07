import { createContext, useContext, useReducer } from "react";

const TaskContext = createContext(null);

function taskReducer(tasks, action) {
  switch (action.type) {
    case "add":
      return [...tasks, action.task];
    case "toggle":
      return tasks.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task,
      );
    case "remove":
      return tasks.filter((task) => task.id !== action.id);
    default:
      throw new Error(`Unknown task action: ${action.type}`);
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  function addTask(text) {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    dispatch({
      type: "add",
      task: {
        id: crypto.randomUUID(),
        text: trimmedText,
        completed: false,
      },
    });
  }

  function toggleTask(id) {
    dispatch({ type: "toggle", id });
  }

  function removeTask(id) {
    dispatch({ type: "remove", id });
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === null) {
    throw new Error("useTasks must be used within a TaskProvider.");
  }
  return context;
}
