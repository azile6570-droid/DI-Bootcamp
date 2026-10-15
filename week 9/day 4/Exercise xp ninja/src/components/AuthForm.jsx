import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/auth/authSlice.js";

export default function AuthForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email }));
    setEmail("");
    setPassword("");
  };

  if (user) {
    return (
      <div className="account-state">
        <span className="account-avatar" aria-hidden="true">
          {user.email.charAt(0).toUpperCase()}
        </span>
        <span className="account-email">{user.email}</span>
        <button
          className="text-button"
          type="button"
          onClick={() => dispatch(logout())}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <details className="auth-menu">
      <summary className="nav-link">Sign in</summary>
      <form className="auth-popover" onSubmit={handleSubmit}>
        <p className="auth-title">Welcome back</p>
        <p className="auth-note">Sign in to your account. This is a demo; no credentials are sent.</p>
        <label>
          Email address
          <input
            autoComplete="email"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            autoComplete="current-password"
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className="auth-submit" type="submit">Sign in</button>
      </form>
    </details>
  );
}
