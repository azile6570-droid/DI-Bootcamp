import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../app/todosSlice.js";

export default function TodoForm() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTodo(value));
    setValue("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        aria-label="Add a task"
        type="text"
        value={value}
        placeholder="Add a new task..."
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
}
