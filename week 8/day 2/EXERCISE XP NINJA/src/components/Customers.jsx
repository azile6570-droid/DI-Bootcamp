import { Component } from "react";

export default class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      isLoaded: false,
      errorMsg: "",
    };
  }

  componentDidMount() {
    const controller = new AbortController();
    this.abortController = controller;

    fetch("/api/customers/", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load customers (HTTP ${response.status}).`);
        }
        return response.json();
      })
      .then((customers) => {
        this.setState({ customers });
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
    const { customers, isLoaded, errorMsg } = this.state;

    return (
      <section className="data-card" aria-labelledby="customers-heading">
        <div className="card-heading">
          <span className="card-number">02</span>
          <div>
            <p className="eyebrow">EXPRESS · PORT 3002</p>
            <h2 id="customers-heading">Customers</h2>
          </div>
          {isLoaded && !errorMsg && (
            <span className="count-badge">{customers.length} RECORDS</span>
          )}
        </div>
        {!isLoaded && <p className="status-message" role="status">Loading customers...</p>}
        {errorMsg && <p className="error-message" role="alert">{errorMsg}</p>}
        {isLoaded && !errorMsg && (
          <ul className="data-list">
            {customers.map((customer) => (
              <li className="data-item" key={customer.id}>
                <span className="avatar" aria-hidden="true">
                  {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                </span>
                <span className="primary-text">
                  {customer.firstName} {customer.lastName}
                </span>
                <span className="item-id">ID {customer.id}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}
