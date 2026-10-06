import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger" role="alert">
          Something went wrong while displaying this page.
        </div>
      );
    }

    return this.props.children;
  }
}
