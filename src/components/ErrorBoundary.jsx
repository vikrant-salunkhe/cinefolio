import React, { Component } from 'react';

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback cinema-styled UI.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ maxWidth: 600, margin: '80px auto', padding: '32px', textAlign: 'center', background: 'var(--color-surface, #151922)', border: '1px solid var(--color-border, #242b38)', borderRadius: 12 }}>
          <h2 style={{ fontFamily: 'var(--font-display, "Bebas Neue")', fontSize: '2.4rem', color: '#E8B44D', letterSpacing: 1 }}>
            TRANSMISSION INTERRUPTED
          </h2>
          <p style={{ color: '#8B92A3', margin: '16px 0 24px', lineHeight: 1.6 }}>
            An unexpected error occurred in the projection booth.
          </p>
          <div style={{ padding: '12px', background: '#0B0E14', color: '#C0392B', fontFamily: 'monospace', fontSize: '0.85rem', borderRadius: 6, marginBottom: 24, textAlign: 'left', overflowX: 'auto' }}>
            {this.state.error?.message || 'Unknown Application Error'}
          </div>
          <button className="btn btn-primary" onClick={this.handleReset}>
            Return to Box Office (Home)
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
