import PostAxiosForm from "./Components/PostAxiosForm.jsx";
import UserPostForm from "./Components/UserPostForm.jsx";

export default function App() {
  return (
    <main className="page-shell">
      <header className="page-intro">
        <p className="eyebrow">REACT · FORM SUBMISSIONS</p>
        <h1>POST JSON data</h1>
        <p>Submit form data to JSONPlaceholder and inspect the response in the console.</p>
      </header>

      <div className="form-grid">
        <UserPostForm />
        <PostAxiosForm />
      </div>
    </main>
  );
}
