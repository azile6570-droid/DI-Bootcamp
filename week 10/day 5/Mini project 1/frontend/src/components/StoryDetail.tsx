import { useEffect, useState, type FormEvent } from "react";
import type { Story, StoryComment, User } from "../../../types/models";
import { apiRequest } from "../lib/api";

interface Props {
  story: Story;
  currentUser: User;
  onClose: () => void;
  onSave: (story: { id: number; title: string; content: string }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onChanged: () => void;
  isPreview?: boolean;
}

export function StoryDetail({ story, currentUser, onClose, onSave, onDelete, onChanged, isPreview = false }: Props) {
  const [editing, setEditing] = useState(false);
  const [comments, setComments] = useState<StoryComment[]>([]);
  const [previewContributors, setPreviewContributors] = useState(story.contributors);
  const [comment, setComment] = useState("");
  const [people, setPeople] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const isAuthor = story.author.id === currentUser.id;
  const isContributor = previewContributors.some((person) => person.id === currentUser.id);
  const canEdit = isAuthor || isContributor;

  useEffect(() => {
    let active = true;
    if (isPreview) {
      setComments([
        {
          id: 901,
          content: "That little detail about the leaf is so good. What if it’s a message from the old greenhouse?",
          author: { id: 3, username: "Jordan Lee", email: "jordan@example.com" },
          createdAt: "2026-10-20T13:00:00.000Z",
        },
        {
          id: 902,
          content: "I love this direction. I’ll pick up with what Mara finds under the soil.",
          author: story.author,
          createdAt: "2026-10-21T15:30:00.000Z",
        },
      ]);
      return () => { active = false; };
    }
    apiRequest<StoryComment[]>(`/stories/${story.id}/comments`)
      .then((result) => { if (active) setComments(result); })
      .catch((error: unknown) => { if (active) setMessage(error instanceof Error ? error.message : "Could not load comments."); });
    return () => { active = false; };
  }, [isPreview, story.author, story.id]);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) { setPeople([]); return; }
    if (isPreview) {
      setPeople([
        { id: 6, username: "Taylor Reed", email: "taylor@example.com" },
        { id: 7, username: "Casey Kim", email: "casey@example.com" },
      ].filter((person) => `${person.username} ${person.email}`.toLowerCase().includes(term.toLowerCase())));
      return;
    }
    const timer = window.setTimeout(() => {
      apiRequest<User[]>(`/users?q=${encodeURIComponent(term)}`)
        .then(setPeople)
        .catch((error: unknown) => setMessage(error instanceof Error ? error.message : "Could not search users."));
    }, 250);
    return () => window.clearTimeout(timer);
  }, [isPreview, query]);

  async function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!comment.trim()) return;
    if (isPreview) {
      setComments((previous) => [...previous, {
        id: Date.now(),
        content: comment.trim(),
        author: currentUser,
        createdAt: new Date().toISOString(),
      }]);
      setComment("");
      return;
    }
    setBusy(true);
    try {
      const created = await apiRequest<StoryComment>(`/stories/${story.id}/comments`, {
        method: "POST", body: JSON.stringify({ content: comment }),
      });
      setComments((previous) => [...previous, created]);
      setComment("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not add comment.");
    } finally {
      setBusy(false);
    }
  }

  async function invite(person: User) {
    setMessage("");
    if (isPreview) {
      setPreviewContributors((previous) => previous.some((contributor) => contributor.id === person.id)
        ? previous
        : [...previous, { ...person, contributorId: Date.now() }]);
      setQuery("");
      return;
    }
    try {
      await apiRequest<void>("/stories/contributors", {
        method: "POST", body: JSON.stringify({ story_id: story.id, user_id: person.id }),
      });
      setQuery("");
      onChanged();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not add contributor.");
    }
  }

  async function removeComment(id: number) {
    if (isPreview) {
      setComments((previous) => previous.filter((entry) => entry.id !== id));
      return;
    }
    try {
      await apiRequest<void>(`/stories/comments/${id}`, { method: "DELETE" });
      setComments((previous) => previous.filter((entry) => entry.id !== id));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete comment.");
    }
  }

  async function removeContributor(person: User) {
    if (isPreview) {
      setPreviewContributors((previous) => previous.filter((contributor) => contributor.id !== person.id));
      return;
    }
    if (!person.contributorId) return;
    try {
      await apiRequest<void>(`/contributors/${person.contributorId}`, { method: "DELETE" });
      onChanged();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not remove contributor.");
    }
  }

  async function leaveCollaboration() {
    if (isPreview) {
      onClose();
      return;
    }
    try {
      await apiRequest<void>(`/stories/${story.id}/contributors/me`, { method: "DELETE" });
      onChanged();
      onClose();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not leave this collaboration.");
    }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await onSave({ id: story.id, title: String(data.get("title")), content: String(data.get("content")) });
      setEditing(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save story.");
    }
  }

  async function deleteSelectedStory() {
    try {
      await onDelete(story.id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete story.");
    }
  }

  return (
    <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title">
        <header className="detail-header">
          <span className="eyebrow">Story room · #{String(story.id).padStart(3, "0")}</span>
          <button className="icon-button" onClick={onClose} aria-label="Close story">×</button>
        </header>
        {editing ? (
          <form className="editor-form" onSubmit={save}>
            <label>Story title<input name="title" defaultValue={story.title} maxLength={255} required /></label>
            <label>Your story<textarea name="content" defaultValue={story.content} rows={10} maxLength={50000} required /></label>
            <div className="action-row"><button className="button button-quiet" type="button" onClick={() => setEditing(false)}>Cancel</button><button className="button button-primary">Save changes</button></div>
          </form>
        ) : (
          <>
            <span className="story-label">A shared story</span>
            <h2 id="detail-title" className="detail-title">{story.title}</h2>
            <div className="story-byline">Started by {story.author.username} · {new Date(story.updatedAt).toLocaleDateString()}</div>
            <article className="story-content">{story.content}</article>
            <div className="collaborators">
              <div className="section-heading"><h3>Writing together</h3><span>{story.contributors.length + 1} voices</span></div>
              <div className="avatar-stack">
                {[story.author, ...previewContributors].map((person) => <span key={person.id} className="avatar" title={person.username}>{person.username.slice(0, 1).toUpperCase()}</span>)}
                <span className="contributor-names">{[story.author, ...previewContributors].map((person) => person.username).join(", ")}</span>
              </div>
              {isAuthor && previewContributors.length > 0 && <div className="writer-list">{previewContributors.map((person) => <span className="writer-pill" key={person.id}>{person.username}<button onClick={() => void removeContributor(person)} aria-label={`Remove ${person.username}`}>×</button></span>)}</div>}
              {isAuthor && <div className="invite-wrap"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Invite a writer by name or email" aria-label="Search writers" />{people.length > 0 && <div className="user-results">{people.map((person) => <button key={person.id} onClick={() => void invite(person)}>{person.username}<span>{person.email}</span></button>)}</div>}</div>}
              {canEdit && <div className="action-row story-actions"><button className="button button-secondary" onClick={() => setEditing(true)}>Edit story</button>{isAuthor && <button className="button button-danger" onClick={() => void deleteSelectedStory()}>Delete story</button>}</div>}
              {!isAuthor && isContributor && <button className="text-button leave-button" onClick={() => void leaveCollaboration()}>Leave collaboration</button>}
            </div>
            <section className="comments">
              <div className="section-heading"><h3>In the margins</h3><span>{comments.length} notes</span></div>
              {comments.length === 0 ? <p className="muted">No notes yet. Start the conversation.</p> : comments.map((entry) => <div className="comment" key={entry.id}><span className="avatar avatar-small">{entry.author.username.slice(0, 1).toUpperCase()}</span><div><strong>{entry.author.username}</strong><time>{new Date(entry.createdAt).toLocaleDateString()}</time><p>{entry.content}</p></div>{(entry.author.id === currentUser.id || isAuthor) && <button className="comment-delete" onClick={() => void removeComment(entry.id)} aria-label="Delete comment">×</button>}</div>)}
              <form className="comment-form" onSubmit={addComment}><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Leave a thought…" rows={2} maxLength={2000} /><button className="button button-primary" disabled={busy || !comment.trim()}>Post note</button></form>
            </section>
            {message && <p className="form-error" role="alert">{message}</p>}
          </>
        )}
      </section>
    </div>
  );
}
