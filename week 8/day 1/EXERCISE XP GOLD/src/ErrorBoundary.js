import { Component } from "react";
import Modal from "./Modal.js";

class TriggeredError extends Component {
  render() {
    throw new Error("I crashed!");
  }
}

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorInfo: null,
    shouldTriggerError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
    this.props.onErrorInfo?.({ error, componentStack: errorInfo.componentStack });
  }

  occurError = () => {
    this.setState({ shouldTriggerError: true });
  };

  closeModal = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      shouldTriggerError: false,
    });
    this.props.onErrorInfo?.(null);
  };

  render() {
    if (this.state.hasError) {
      return (
        <Modal
          errorInfo={{
            error: this.state.error,
            componentStack: this.state.errorInfo?.componentStack,
          }}
          onClose={this.closeModal}
        />
      );
    }

    return (
      <>
        {this.props.children(this.occurError)}
        {this.state.shouldTriggerError && <TriggeredError />}
      </>
    );
  }
}
