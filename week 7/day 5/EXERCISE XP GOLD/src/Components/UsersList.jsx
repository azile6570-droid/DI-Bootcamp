import { Component } from 'react'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

export default class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoaded: false,
      errorMsg: '',
    }
    this.abortController = new AbortController()
  }

  componentDidMount() {
    fetch(USERS_URL, { signal: this.abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load users (HTTP ${response.status}).`)
        }
        return response.json()
      })
      .then((users) => {
        this.setState({ users })
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
    const { users, isLoaded, errorMsg } = this.state

    return (
      <section className="api-card" aria-labelledby="users-heading">
        <div className="api-card-heading">
          <span className="api-card-number">02</span>
          <h2 id="users-heading">Users</h2>
        </div>
        {!isLoaded && <p role="status">Loading users…</p>}
        {errorMsg && <p className="api-error" role="alert">{errorMsg}</p>}
        {isLoaded && !errorMsg && (
          <ul className="user-list">
            {users.map((user) => (
              <li className="user-item" key={user.id}>
                <span className="user-avatar" aria-hidden="true">
                  {user.name.charAt(0)}
                </span>
                <div>
                  <h3>{user.name}</h3>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    )
  }
}
