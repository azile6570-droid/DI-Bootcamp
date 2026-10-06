import posts from "./posts.json";

export default function PostList() {
  return (
    <section className="exercise-section">
      <h2>Posts</h2>
      {posts.map((post) => (
        <article className="post" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </article>
      ))}
    </section>
  );
}
