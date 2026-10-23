import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { clearAuthError, login, register } from "../features/auth/authSlice";

export function AuthScreen() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);
  const [isSignup, setIsSignup] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    try {
      if (isSignup) {
        await dispatch(register({
          username: String(data.get("username")),
          email: String(data.get("email")),
          password: String(data.get("password")),
        })).unwrap();
      } else {
        await dispatch(login({
          email: String(data.get("email")),
          password: String(data.get("password")),
        })).unwrap();
      }
    } catch {
      return;
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-story">
        <a className="brand brand-light" href="#"><span className="brand-mark">s.</span> storyweave</a>
        <div>
          <span className="eyebrow">A canvas for many voices</span>
          <h1>Every great story starts with <em>“what if?”</em></h1>
          <p>Dream it up, pass the pen, and see where the story takes you.</p>
        </div>
        <div className="auth-note">✳ &nbsp; One idea. A thousand directions.</div>
      </section>
      <section className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit}>
          <span className="eyebrow">{isSignup ? "Your next chapter" : "Welcome back"}</span>
          <h2>{isSignup ? "Create your space" : "Sign in to write"}</h2>
          <p className="muted">{isSignup ? "Bring your stories to life, together." : "Your stories are waiting for you."}</p>
          {isSignup && <label>Username<input name="username" autoComplete="username" required maxLength={50} /></label>}
          <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <label>Password<input name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} required minLength={isSignup ? 8 : undefined} /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary button-wide" disabled={busy}>{busy ? "One moment…" : isSignup ? "Create account" : "Sign in"}</button>
          <p className="auth-switch">
            {isSignup ? "Already have an account?" : "New to Storyweave?"}{" "}
            <button type="button" className="text-button" onClick={() => { dispatch(clearAuthError()); setIsSignup(!isSignup); }}>
              {isSignup ? "Sign in" : "Create an account"}
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}
