import { Component } from "react";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
      errorMsg: "",
    };
  }

  componentDidMount() {
    const controller = new AbortController();
    this.abortController = controller;

    fetch("/users", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load users (HTTP ${response.status}).`);
        }
        return response.json();
      })
      .then((users) => {
        this.setState({ users });
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
    this.abortController?.abort();
  }

  render() {
    const { users, isLoaded, errorMsg } = this.state;

    return (
      <section className="data-card" aria-labelledby="users-heading">
        <div className="card-heading">
          <span className="card-number">01</span>
          <div>
            <p className="eyebrow">EXPRESS · PORT 3001</p>
            <h2 id="users-heading">Users</h2>
          </div>
        </div>
        {!isLoaded && <p className="status-message" role="status">Loading users...</p>}
        {errorMsg && <p className="error-message" role="alert">{errorMsg}</p>}
        {isLoaded && !errorMsg && (
          <ul className="data-list">
            {users.map((user) => (
              <li className="data-item" key={user.id}>
                <span className="avatar" aria-hidden="true">{user.username.charAt(0).toUpperCase()}</span>
                <span className="primary-text">{user.username}</span>
                <span className="item-id">ID {user.id}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}
