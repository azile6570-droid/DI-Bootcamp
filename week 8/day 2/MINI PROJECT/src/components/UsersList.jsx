import { Component } from "react";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

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

    fetch(USERS_URL, { signal: controller.signal })
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
    this.abortController.abort();
  }

  render() {
    const { users, isLoaded, errorMsg } = this.state;

    return (
      <section className="content-card" aria-labelledby="users-heading">
        <div className="card-heading">
          <span className="card-number">02</span>
          <div>
            <p className="eyebrow">JSONPLACEHOLDER</p>
            <h2 id="users-heading">Users</h2>
          </div>
          {isLoaded && !errorMsg && (
            <span className="item-count">{users.length} USERS</span>
          )}
        </div>

        {!isLoaded && <p className="status-message" role="status">Loading users...</p>}
        {errorMsg && <p className="error-message" role="alert">{errorMsg}</p>}
        {isLoaded && !errorMsg && users.length === 0 && (
          <p className="status-message">No users found.</p>
        )}
        {isLoaded && !errorMsg && users.length > 0 && (
          <ul className="user-list">
            {users.map((user) => (
              <li className="user-item" key={user.id}>
                <span className="user-avatar" aria-hidden="true">
                  {user.name.charAt(0)}
                </span>
                <div className="user-details">
                  <h3>{user.name}</h3>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
                <span className="user-id">ID {String(user.id).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}
