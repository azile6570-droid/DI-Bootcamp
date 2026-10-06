import { useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./ErrorBoundary.js";
import Example1 from "./Example1.js";
import Example2 from "./Example2.js";
import Example3 from "./Example3.js";
import PostList from "./PostList.js";

const postPayload = {
  key1: "myusername",
  email: "mymail@gmail.com",
  name: "Isaac",
  lastname: "Doe",
  age: 27,
};

function HomeScreen() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState("");

  async function sendPost() {
    setPostError("");
    let url;

    try {
      url = new URL(webhookUrl);
    } catch {
      setPostError("Enter a valid webhook URL.");
      return;
    }

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      setPostError("The webhook URL must use HTTP or HTTPS.");
      return;
    }

    setIsPosting(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postPayload),
      });
      const responseBody = await response.text();

      console.log("Webhook response:", response, responseBody);

      if (!response.ok) {
        throw new Error(`Webhook returned HTTP ${response.status}: ${responseBody}`);
      }
    } catch (error) {
      console.error("Unable to post webhook data:", error);
      setPostError(error.message || "Unable to send the webhook request.");
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <main className="container py-4">
      <h1>Home</h1>
      <PostList />
      <Example1 />
      <Example2 />
      <Example3 />

      <section className="exercise-section">
        <h2>Post JSON Data</h2>
        <label className="form-label" htmlFor="webhook-url">
          Your webhook.site URL
        </label>
        <div className="d-flex flex-column flex-sm-row gap-2">
          <input
            className="form-control"
            id="webhook-url"
            type="url"
            value={webhookUrl}
            onChange={(event) => setWebhookUrl(event.target.value)}
            placeholder="https://webhook.site/your-unique-url"
          />
          <button
            className="btn btn-primary flex-shrink-0"
            type="button"
            onClick={sendPost}
            disabled={isPosting || !webhookUrl.trim()}
          >
            {isPosting ? "Sending..." : "Send JSON"}
          </button>
        </div>
        {postError && (
          <p className="text-danger mt-2 mb-0" role="alert">
            {postError}
          </p>
        )}
      </section>
    </main>
  );
}

function ProfileScreen() {
  return (
    <main className="container py-4">
      <h1>Profile</h1>
    </main>
  );
}

function ShopScreen() {
  throw new Error("The shop is currently unavailable.");
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">React Exercises</span>
          <div className="navbar-nav">
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
              to="/"
              end
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
              to="/profile"
            >
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
              to="/shop"
            >
              Shop
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <HomeScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path="/profile"
          element={
            <ErrorBoundary>
              <ProfileScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path="/shop"
          element={
            <ErrorBoundary>
              <ShopScreen />
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
