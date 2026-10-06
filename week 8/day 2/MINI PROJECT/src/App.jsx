import PostList from "./components/PostList.jsx";
import UsersList from "./components/UsersList.jsx";

export default function App() {
  return (
    <main className="page-shell">
      <header className="page-intro">
        <p className="eyebrow">REACT · FETCH API</p>
        <h1>Posts & People</h1>
        <p>Posts and users fetched from JSONPlaceholder.</p>
      </header>

      <div className="content-grid">
        <PostList />
        <UsersList />
      </div>
    </main>
  );
}
