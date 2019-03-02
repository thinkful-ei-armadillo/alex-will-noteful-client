import React from 'react';

export default class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    }
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  render() {
    const message = this.state.error ? 'Something went wrong!' : this.props.error;
    if (this.state.error || this.props.error) {
      return (
        <section className="error__page">
          <h2>{message}</h2>
          <p>{this.state.error ? 'Go back to the <a href="/">Home Page</a>?' : 'Please try again later.'}</p>
        </section>
      )
    }
    return this.props.children;
  }
}