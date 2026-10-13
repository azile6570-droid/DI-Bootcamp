import { connect } from "react-redux";
import { removeTodo, toggleTodo } from "../redux/actions.js";

function TodoList({ filter, onRemoveTodo, onToggleTodo, todos }) {
  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <>
      {visibleTodos.length > 0 ? (
        <ul className="todo-list">
          {visibleTodos.map((todo) => (
            <li className={`todo-row${todo.completed ? " is-completed" : ""}`} key={todo.id}>
              <button
                aria-label={todo.completed ? `Mark ${todo.text} as active` : `Complete ${todo.text}`}
                aria-pressed={todo.completed}
                className="toggle-button"
                onClick={() => onToggleTodo(todo.id)}
                type="button"
              >
                {todo.completed && <span aria-hidden="true">✓</span>}
              </button>
              <span className="todo-text">{todo.text}</span>
              <button
                aria-label={`Remove ${todo.text}`}
                className="remove-button"
                onClick={() => onRemoveTodo(todo.id)}
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">✳</span>
          <p>{todos.length === 0 ? "Your list is a clean slate." : "Nothing to show here."}</p>
          <span>
            {todos.length === 0
              ? "Add a task above to get started."
              : "Try another filter or add a new task."}
          </span>
        </div>
      )}
      <div className="list-summary">
        <span>{remainingCount} {remainingCount === 1 ? "task" : "tasks"} left</span>
        <span>{todos.length} total</span>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = {
  onRemoveTodo: removeTodo,
  onToggleTodo: toggleTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
