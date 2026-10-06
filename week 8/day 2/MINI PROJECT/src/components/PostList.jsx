import { Component } from "react";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: "",
      isLoaded: false,
    };
  }

  componentDidMount() {
    const controller = new AbortController();
    this.abortController = controller;

    fetch(POSTS_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load posts (HTTP ${response.status}).`);
        }
        return response.json();
      })
      .then((posts) => {
        this.setState({ posts });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          this.setState({ errorMsg: error.message });
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          this.setState({ isLoaded: true });
        }
      });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    const { posts, errorMsg, isLoaded } = this.state;

    return (
      <section className="content-card" aria-labelledby="posts-heading">
        <div className="card-heading">
          <span className="card-number">01</span>
          <div>
            <p className="eyebrow">JSONPLACEHOLDER</p>
            <h2 id="posts-heading">Posts</h2>
          </div>
        </div>

        {!isLoaded && <p className="status-message" role="status">Loading posts...</p>}
        {errorMsg && <p className="error-message" role="alert">{errorMsg}</p>}
        {isLoaded && !errorMsg && posts.length === 0 && (
          <p className="status-message">No posts found.</p>
        )}
        {posts.length > 0 && (
          <div className="item-list">
            {posts.map((post) => (
              <article className="post-item" key={post.id}>
                <span className="item-id">POST / {String(post.id).padStart(3, "0")}</span>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }
}
