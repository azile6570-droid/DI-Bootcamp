import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoryById, selectCompletedTasks } from "./app/productivitySlice.js";
import CategorySelector from "./components/CategorySelector.jsx";
import TaskList from "./components/TaskList.jsx";

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const completedCount = useSelector(selectCompletedTasks);
  const selectedCategory = useSelector((state) =>
    selectCategoryById(state, selectedCategoryId),
  );

  const heading = selectedCategoryId === "all"
    ? "All tasks"
    : selectedCategoryId === "uncategorized"
      ? "Uncategorized"
      : selectedCategory?.name ?? "All tasks";

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#" aria-label="Daymark home">
          <span className="wordmark-icon" aria-hidden="true">d.</span>
          daymark
        </a>
        <span className="date-label">
          {new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date())}
        </span>
      </header>

      <section className="welcome">
        <div>
          <p className="eyebrow">MAKE SPACE FOR WHAT MATTERS</p>
          <h1>A little progress,<br />every day.</h1>
          <p className="welcome-copy">A calmer way to keep track of the things you want to get done.</p>
        </div>
        <div className="progress-summary" aria-live="polite">
          <span className="summary-number">{completedCount}</span>
          <span className="summary-caption">tasks completed</span>
          <span className="summary-spark" aria-hidden="true">✳</span>
        </div>
      </section>

      <div className="workspace">
        <CategorySelector
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
        <TaskList
          selectedCategoryId={selectedCategoryId}
          heading={heading}
        />
      </div>

      <footer className="footer-note">
        <span aria-hidden="true">✳</span> One thoughtful step at a time.
      </footer>
    </main>
  );
}
