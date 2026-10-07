import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const TaskContext = createContext(null);
const STORAGE_KEY = "daymark-tasks";
const FILTERS = ["all", "active", "completed"];

function loadInitialState() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (!savedTasks) {
      return { tasks: [], filter: "all" };
    }

    const parsedTasks = JSON.parse(savedTasks);
    if (!Array.isArray(parsedTasks)) {
      throw new Error("Saved tasks must be an array.");
    }

    const tasks = parsedTasks.filter(
      (task) =>
        typeof task?.id === "string" &&
        typeof task?.text === "string" &&
        typeof task?.completed === "boolean",
    );
    return { tasks, filter: "all" };
  } catch (error) {
    console.error("Unable to load saved tasks:", error);
    return { tasks: [], filter: "all" };
  }
}

function taskReducer(state, action) {
  switch (action.type) {
    case "task/add":
      return { ...state, tasks: [...state.tasks, action.task] };
    case "task/toggle":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task,
        ),
      };
    case "task/edit":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, text: action.text } : task,
        ),
      };
    case "task/remove":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "task/filter":
      if (!FILTERS.includes(action.filter)) {
        throw new Error(`Unknown task filter: ${action.filter}`);
      }
      return { ...state, filter: action.filter };
    case "task/clear-completed":
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.completed),
      };
    default:
      throw new Error(`Unknown task action: ${action.type}`);
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, undefined, loadInitialState);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
      setStorageError("");
    } catch (error) {
      console.error("Unable to save tasks:", error);
      setStorageError("Your changes could not be saved in this browser.");
    }
  }, [state.tasks]);

  function addTask(text) {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    dispatch({
      type: "task/add",
      task: {
        id: crypto.randomUUID(),
        text: trimmedText,
        completed: false,
        createdAt: Date.now(),
      },
    });
  }

  function toggleTask(id) {
    dispatch({ type: "task/toggle", id });
  }

  function editTask(id, text) {
    const trimmedText = text.trim();
    if (!trimmedText) return;
    dispatch({ type: "task/edit", id, text: trimmedText });
  }

  function removeTask(id) {
    dispatch({ type: "task/remove", id });
  }

  function setFilter(filter) {
    dispatch({ type: "task/filter", filter });
  }

  function clearCompleted() {
    dispatch({ type: "task/clear-completed" });
  }

  return (
    <TaskContext.Provider
      value={{
        ...state,
        addTask,
        toggleTask,
        editTask,
        removeTask,
        setFilter,
        clearCompleted,
        storageError,
      }}
    >
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
