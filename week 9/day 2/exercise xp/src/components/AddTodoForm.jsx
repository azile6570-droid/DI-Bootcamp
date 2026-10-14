import { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../redux/actions.js";

function AddTodoForm({ addTodo }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const task = text.trim();
    if (!task) return;

    addTodo(task);
    setText("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-todo">
        Add a task
      </label>
      <span className="input-sparkle" aria-hidden="true">✳</span>
      <input
        autoComplete="off"
        id="new-todo"
        onChange={(event) => setText(event.target.value)}
        placeholder="What would you like to get done?"
        value={text}
      />
      <button className="add-button" disabled={!text.trim()} type="submit">
        <span aria-hidden="true">+</span>
        Add task
      </button>
    </form>
  );
}

export default connect(null, { addTodo })(AddTodoForm);
