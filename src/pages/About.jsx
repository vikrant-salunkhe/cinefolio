import React from 'react';

export default function About() {
  return (
    <div style={{ maxWidth: 760 }}>
      <h2 className="page-heading">About CineFolio</h2>
      <p className="page-subheading" style={{ marginBottom: 20 }}>
        Movie Information Portal &mdash; Advanced Web Technologies Mini Project (Phase II / FA-2)
      </p>

      <div style={{ lineHeight: 1.7, marginBottom: 20, color: '#c5cbd8' }}>
        <p style={{ marginBottom: 16 }}>
          <strong>CineFolio</strong> is an interactive, component-driven web application built
          with React 18, Vite, and modern JavaScript (ES6+). It provides a cinema-curated portal where
          film enthusiasts can browse titles, search in real-time, filter by genre and rating,
          manage custom watchlists, and submit community ratings and reviews.
        </p>

        <h3 className="details-section-title" style={{ fontSize: 18, marginTop: 24 }}>
          Phase II (FA-2) Advanced Features Implemented
        </h3>
        <ul style={{ paddingLeft: 20, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>
            <strong>React Hooks & State Management:</strong> Reusable custom hooks (<code>useDebounce</code>, <code>useLocalStorage</code>), <code>useReducer</code> + <code>useContext</code> for global watchlist and toast notifications, <code>useMemo</code> for client-side pagination.
          </li>
          <li>
            <strong>Forms & Real-time Validation:</strong> Interactive &ldquo;Add Movie&rdquo; and &ldquo;Review &amp; Rating&rdquo; forms featuring live field validation, touched state tracking, error messages, character counters, and live API autofill.
          </li>
          <li>
            <strong>Full CRUD Operations:</strong> Complete Create, Read, Update, and Delete workflows for community movie entries, user ratings/reviews, and watchlist status tracking with private notes.
          </li>
          <li>
            <strong>API Integration & Reliability:</strong> Multi-tiered service architecture with live external movie API queries (OMDb) coupled with automatic local persistent storage fallback.
          </li>
          <li>
            <strong>Resilience & Error Handling:</strong> React <code>ErrorBoundary</code> component, dynamic Toast alerts, image error fallbacks, and 404 route handling.
          </li>
          <li>
            <strong>Performance Optimization:</strong> Route-level code-splitting with <code>React.lazy()</code> and <code>&lt;Suspense&gt;</code> fallback animations.
          </li>
        </ul>
      </div>

      <div style={{ padding: '16px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>
        <div>Student: Vikrant Salunkhe (PRN: 125M1H006)</div>
        <div>Course: Advanced Web Technologies (SYMCA, Semester III)</div>
        <div>Guide: Prof. Dr. Avinash Chormale | PCCOE, Pune</div>
      </div>
    </div>
  );
}
