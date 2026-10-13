import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="empty-state" style={{ marginTop: 60 }}>
      <div className="empty-state-title">404 &mdash; Page Not Found</div>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
        Back to Home
      </Link>
    </div>
  );
}
