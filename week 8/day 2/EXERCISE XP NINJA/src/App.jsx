import Customers from "./components/Customers.jsx";
import UsersList from "./components/UsersList.jsx";

export default function App() {
  return (
    <main className="page-shell">
      <header className="page-intro">
        <p className="eyebrow">REACT + EXPRESS</p>
        <h1>Backend data, in view.</h1>
        <p>Two small APIs, two React class components, one shared workspace.</p>
      </header>

      <div className="content-grid">
        <UsersList />
        <Customers />
      </div>
    </main>
  );
}
