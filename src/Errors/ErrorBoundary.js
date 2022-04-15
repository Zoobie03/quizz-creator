import React from 'react';

export class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { ErrorDisplay } = this.props;
    if (this.state.error) {
      return <ErrorDisplay error={this.state.error} />;
    }
    return this.props.children;
  }
}

export function ErrorDisplay({ error }) {
  return (
    <div style={{ color: 'red' }}>
      <h1>Oups !</h1>
      <p>Une erreur est survenue : {error.message}</p>
    </div>
  );
}
