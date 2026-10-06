import { Component } from 'react'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export default class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      errorMsg: '',
      isLoaded: false,
    }
    this.abortController = new AbortController()
  }

  componentDidMount() {
    fetch(POSTS_URL, { signal: this.abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load posts (HTTP ${response.status}).`)
        }
        return response.json()
      })
      .then((posts) => {
        this.setState({ posts })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          this.setState({ errorMsg: error.message })
        }
      })
      .finally(() => {
        if (!this.abortController.signal.aborted) {
          this.setState({ isLoaded: true })
        }
      })
  }

  componentWillUnmount() {
    this.abortController.abort()
  }

  render() {
    const { posts, errorMsg, isLoaded } = this.state

    return (
      <section className="api-card" aria-labelledby="posts-heading">
        <div className="api-card-heading">
          <span className="api-card-number">01</span>
          <h2 id="posts-heading">Posts</h2>
        </div>
        {!isLoaded && <p role="status">Loading posts…</p>}
        {errorMsg && <p className="api-error" role="alert">{errorMsg}</p>}
        {isLoaded && !errorMsg && posts.length > 0 && (
          <div className="post-list">
            {posts.map((post) => (
              <article className="post-item" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    )
  }
}
