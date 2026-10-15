import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../app/todosSlice.js";

export default function AddTodo() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const todoText = text.trim();
    if (!todoText) return;

    dispatch(addTodo(todoText));
    setText("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <span className="input-sparkle" aria-hidden="true">✧</span>
      <input
        type="text"
        aria-label="New todo"
        placeholder="What needs your attention?"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button className="add-button" type="submit" disabled={!text.trim()}>
        <span aria-hidden="true">+</span>
        Add
      </button>
    </form>
  );
}
