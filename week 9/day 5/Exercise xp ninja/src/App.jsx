import TodoList from "./components/TodoList.jsx";

export default function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="eyebrow">A LITTLE SPACE FOR BIG PLANS</p>
        <h1>Make room<br />for what matters.</h1>
        <p className="intro">
          One small step at a time. Add a task, then enjoy the feeling of
          checking it off.
        </p>
      </header>
      <TodoList />
      <footer className="page-footer">
        <span className="footer-sparkle" aria-hidden="true">✳</span>
        Progress, not perfection.
      </footer>
    </main>
  );
}
