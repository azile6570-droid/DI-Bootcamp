import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Story } from "../../types/models";
import { AuthScreen } from "./components/AuthScreen";
import { StoryDetail } from "./components/StoryDetail";
import { useAppDispatch, useAppSelector } from "./features/hooks";
import { logout, restoreSession, sessionExpired, tokenRefreshed } from "./features/auth/authSlice";
import { loadStories, removeStory, saveStory } from "./features/stories/storiesSlice";

const previewUser = { id: 1, username: "Alex Morgan", email: "alex@example.com" };
const previewStories: Story[] = [
  {
    id: 101,
    title: "The last garden on Mars",
    content: "The first time the red dust fell like snow, Mara found a green leaf pressed against the inside of the dome. Nobody believed her at first. Then the little leaf moved.",
    author: { id: 2, username: "Maya Chen", email: "maya@example.com" },
    contributors: [
      previewUser,
      { id: 3, username: "Jordan Lee", email: "jordan@example.com" },
    ],
    createdAt: "2026-10-18T10:00:00.000Z",
    updatedAt: "2026-10-21T15:30:00.000Z",
  },
  {
    id: 102,
    title: "A library for lost things",
    content: "At the end of a narrow alley, between a tailor and a teashop, there was a door with no handle. It opened only for people who had lost something they could not name.",
    author: { id: 4, username: "Sam Rivera", email: "sam@example.com" },
    contributors: [
      { id: 5, username: "Priya Patel", email: "priya@example.com" },
    ],
    createdAt: "2026-10-19T11:00:00.000Z",
    updatedAt: "2026-10-20T09:15:00.000Z",
  },
  {
    id: 103,
    title: "Postcards from the moon",
    content: "Dear Earth, the quiet here is different from what I expected. It has a shape to it, almost like a room waiting for someone to come home.",
    author: previewUser,
    contributors: [],
    createdAt: "2026-10-17T08:00:00.000Z",
    updatedAt: "2026-10-19T12:40:00.000Z",
  },
];

export default function App() {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth);
  const { items, status: storiesStatus, error } = useAppSelector((state) => state.stories);
  const previewMode = import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "1";
  const [selected, setSelected] = useState<Story | null>(null);
  const [demoStories, setDemoStories] = useState(previewStories);
  const [showMine, setShowMine] = useState(false);
  const [search, setSearch] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const requestedTheme = new URLSearchParams(window.location.search).get("theme");
    return requestedTheme === "light" || requestedTheme === "dark"
      ? requestedTheme
      : window.localStorage.getItem("storyweave-theme") ?? "dark";
  });
  const [formError, setFormError] = useState("");
  const activeUser = previewMode ? previewUser : user;
  const visibleItems = previewMode ? demoStories : items;

  useEffect(() => {
    if (!previewMode) void dispatch(restoreSession());
  }, [dispatch, previewMode]);
  useEffect(() => {
    const onExpired = () => dispatch(sessionExpired());
    const onTokenRefreshed = (event: Event) => {
      const token = (event as CustomEvent<string>).detail;
      dispatch(tokenRefreshed(token));
    };
    window.addEventListener("auth:expired", onExpired);
    window.addEventListener("auth:token-refreshed", onTokenRefreshed);
    return () => {
      window.removeEventListener("auth:expired", onExpired);
      window.removeEventListener("auth:token-refreshed", onTokenRefreshed);
    };
  }, [dispatch]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("storyweave-theme", theme);
  }, [theme]);
  useEffect(() => {
    if (!previewMode && status === "authenticated") void dispatch(loadStories());
  }, [dispatch, previewMode, status]);

  const visibleStories = useMemo(() => {
    const term = search.trim().toLowerCase();
    return visibleItems.filter((story) =>
      (!showMine || story.author.id === activeUser?.id || story.contributors.some((person) => person.id === activeUser?.id)) &&
      (!term || `${story.title} ${story.content} ${story.author.username}`.toLowerCase().includes(term)),
    );
  }, [activeUser?.id, search, showMine, visibleItems]);

  if (!previewMode && status === "loading") return <div className="boot-screen"><span className="brand-mark">s.</span><p>Opening your story room…</p></div>;
  if (!previewMode && (status !== "authenticated" || !user)) return <AuthScreen />;
  if (!activeUser) return <AuthScreen />;

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(event.currentTarget);
    try {
      if (previewMode) {
        const now = new Date().toISOString();
        const story: Story = {
          id: Math.max(0, ...demoStories.map((item) => item.id)) + 1,
          title: String(data.get("title")).trim(),
          content: String(data.get("content")).trim(),
          author: previewUser,
          contributors: [],
          createdAt: now,
          updatedAt: now,
        };
        setDemoStories((current) => [story, ...current]);
        setComposerOpen(false);
        form.reset();
        setSelected(story);
        return;
      }
      const story = await dispatch(saveStory({ title: String(data.get("title")), content: String(data.get("content")) })).unwrap();
      setComposerOpen(false);
      form.reset();
      setSelected(story);
    } catch (failure) {
      setFormError(failure instanceof Error ? failure.message : "Could not create story.");
    }
  }

  async function handleSave(story: { id: number; title: string; content: string }) {
    if (previewMode) {
      setDemoStories((current) => current.map((entry) =>
        entry.id === story.id ? { ...entry, ...story, updatedAt: new Date().toISOString() } : entry,
      ));
      setSelected((current) => current?.id === story.id
        ? { ...current, ...story, updatedAt: new Date().toISOString() }
        : current);
      return;
    }
    await dispatch(saveStory(story)).unwrap();
    setSelected((current) => current?.id === story.id ? { ...current, ...story, updatedAt: new Date().toISOString() } : current);
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this story and its comments? This cannot be undone.")) return;
    try {
      if (previewMode) {
        setDemoStories((current) => current.filter((story) => story.id !== id));
        setSelected(null);
        return;
      }
      await dispatch(removeStory(id)).unwrap();
      setSelected(null);
    } catch (failure) {
      const message = failure instanceof Error ? failure.message : "Could not delete story.";
      setFormError(message);
      throw new Error(message);
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark">s.</span> storyweave</a>
        <nav className="top-nav"><a className="nav-active" href="#stories">Discover</a><a href="#stories" onClick={() => setShowMine(true)}>My stories</a></nav>
        <div className="top-actions">
          <button className="icon-button theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle color theme">{theme === "dark" ? "☼" : "☾"}</button>
          <span className="user-chip"><span className="avatar avatar-small">{activeUser.username.slice(0, 1).toUpperCase()}</span><span>{activeUser.username}</span></span>
          <button className="text-button signout" onClick={() => previewMode ? window.location.assign("/") : void dispatch(logout())}>{previewMode ? "Exit preview" : "Sign out"}</button>
        </div>
      </header>

      {previewMode && <div className="preview-notice">Sample preview · Changes are temporary and won’t be saved <a href="/">Exit preview</a></div>}

      <section className="hero">
        <div className="hero-copy"><span className="eyebrow"><span className="live-dot" /> YOUR COMMUNITY OF STORYTELLERS</span><h1>Stories are better<br />when <em>shared.</em></h1><p>A little imagination goes a long way. Start something wonderful, then invite someone in.</p><button className="button button-primary" onClick={() => { setFormError(""); setComposerOpen(true); }}>Begin a story</button></div>
        <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="paper-card"><span className="paper-spark">✳</span><span className="paper-line line-long" /><span className="paper-line" /><span className="paper-line line-short" /><span className="paper-sign">once upon a time…</span></div><div className="art-caption">A blank page.<br /><em>Infinite possibilities.</em></div><span className="art-star star-one">✳</span><span className="art-star star-two">✴</span></div>
      </section>

      <section className="library" id="stories">
        <div className="library-head"><div><span className="eyebrow">THE COMMONPLACE BOOK</span><h2>Find your next <em>favorite.</em></h2></div><button className="button button-secondary compact" onClick={() => { setFormError(""); setComposerOpen(true); }}>＋ New story</button></div>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <div className="filter-row"><div className="filter-tabs"><button className={!showMine ? "filter-active" : ""} onClick={() => setShowMine(false)}>All stories <span>{visibleItems.length}</span></button><button className={showMine ? "filter-active" : ""} onClick={() => setShowMine(true)}>My collaborations</button></div><label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a story…" aria-label="Search stories" /><kbd>⌘ K</kbd></label></div>
        {error && <p className="form-error" role="alert">{error}</p>}
        {!previewMode && storiesStatus === "loading" ? <div className="empty-state"><span className="loading-orb" />Gathering stories…</div> : visibleStories.length === 0 ? <div className="empty-state"><span className="empty-icon">✳</span><h3>{search || showMine ? "Nothing on this page yet." : "The first page is yours."}</h3><p>{search || showMine ? "Try a different search or explore all stories." : "Start with a sentence. Invite someone to add the next."}</p>{!search && <button className="text-button" onClick={() => setComposerOpen(true)}>Write the first story</button>}</div> : (
          <div className="story-grid">{visibleStories.map((story, index) => <button className={`story-card card-tone-${index % 4}`} key={story.id} onClick={() => setSelected(story)}><div className="card-top"><span className="story-label">{story.contributors.length ? `${story.contributors.length + 1} writers` : "Open story"}</span></div><span className="card-glyph">{["✳", "◒", "✦", "❋"][index % 4]}</span><h3>{story.title}</h3><p>{story.content}</p><div className="card-footer"><span className="avatar-stack">{[story.author, ...story.contributors].slice(0, 4).map((person) => <span key={person.id} className="avatar avatar-small" title={person.username}>{person.username.slice(0, 1).toUpperCase()}</span>)}</span><span className="card-author">by {story.author.username}</span><time>{new Date(story.updatedAt).toLocaleDateString()}</time></div></button>)}</div>
        )}
      </section>
      <footer className="footer"><span>✳ &nbsp; Make room for a new voice.</span><span>Storyweave · A shared space to imagine</span></footer>

      {composerOpen && <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setComposerOpen(false); }}><form className="compose-panel" onSubmit={create}><div className="section-heading"><div><span className="eyebrow">A fresh beginning</span><h2>Start a story</h2></div><button type="button" className="icon-button" onClick={() => setComposerOpen(false)} aria-label="Close">×</button></div><label>Give it a title<input name="title" placeholder="The city that forgot the sea…" maxLength={255} required autoFocus /></label><label>Write the opening<textarea name="content" placeholder="It started on an ordinary Tuesday…" rows={7} maxLength={50000} required /></label><p className="muted small-copy">You can invite collaborators once your story is underway.</p>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="button button-primary button-wide">Create story</button></form></div>}
      {selected && <StoryDetail story={visibleItems.find((story) => story.id === selected.id) ?? selected} currentUser={activeUser} onClose={() => setSelected(null)} onSave={handleSave} onDelete={handleDelete} onChanged={() => previewMode ? undefined : void dispatch(loadStories())} isPreview={previewMode} />}
    </main>
  );
}
