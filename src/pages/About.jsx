import React, { useState, useRef } from 'react';
import { exportDataBackup, importDataBackup, resetToDefaults } from '../services/movieService.js';
import { useToast } from '../context/ToastContext.jsx';

export default function About() {
  const { addToast } = useToast();
  const fileInputRef = useRef(null);
  const [processing, setProcessing] = useState(false);

  const handleExportBackup = async () => {
    try {
      setProcessing(true);
      const backup = await exportDataBackup();
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cinefolio-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addToast('Data backup exported successfully!', 'success');
    } catch (err) {
      addToast('Failed to export data backup', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        setProcessing(true);
        const parsed = JSON.parse(evt.target.result);
        const result = await importDataBackup(parsed);
        addToast(`Restored ${result.moviesCount} movies and ${result.reviewsCount} reviews!`, 'success');
      } catch (err) {
        addToast(err.message || 'Invalid backup JSON file', 'error');
      } finally {
        setProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = async () => {
    if (!window.confirm('Reset all catalogue movies and reviews to original seed defaults? Any custom movies will be removed.')) {
      return;
    }
    try {
      setProcessing(true);
      await resetToDefaults();
      addToast('Catalogue restored to initial seed defaults!', 'info');
    } catch (err) {
      addToast('Failed to reset defaults', 'error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <h2 className="page-heading">About CineFolio</h2>
      <p className="page-subheading" style={{ marginBottom: 24 }}>
        Movie Information Portal &mdash; Advanced Web Technologies Mini Project (Formative Assessment Complete)
      </p>

      <div style={{ lineHeight: 1.7, marginBottom: 28, color: '#c5cbd8' }}>
        <p style={{ marginBottom: 16 }}>
          <strong>CineFolio</strong> is an interactive, component-driven web application built
          with React 18, Vite, and modern JavaScript (ES6+). It provides a cinema-curated portal where
          film enthusiasts can browse titles, search in real-time, filter by genre and rating,
          manage custom watchlists, edit entries, inspect box office insights, and submit community ratings and reviews.
        </p>

        <h3 className="details-section-title" style={{ fontSize: 18, marginTop: 24 }}>
          Comprehensive Architectural Capabilities
        </h3>
        <ul style={{ paddingLeft: 20, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <li>
            <strong>React Hooks & State Management:</strong> Reusable custom hooks (<code>useDebounce</code>, <code>useLocalStorage</code>), <code>useReducer</code> + <code>useContext</code> for global watchlist and toast notifications, <code>useMemo</code> for client-side pagination and real-time box office insights.
          </li>
          <li>
            <strong>Interactive Forms & Validation:</strong> Community &ldquo;Add Movie&rdquo;, &ldquo;Edit Movie&rdquo; modal, and &ldquo;Review &amp; Rating&rdquo; forms featuring live field validation, dirty/touched tracking, character counters, and live API autofill (OMDb).
          </li>
          <li>
            <strong>Full End-to-End CRUD Operations:</strong> Complete Create, Read, Update, and Delete workflows for community movie records, user ratings/reviews, and watchlist status tracking with private notes.
          </li>
          <li>
            <strong>Analytics & Insights Engine:</strong> Live metrics dashboard tracking genre distributions, critic rating averages, screening runtimes, and box office leaderboards.
          </li>
          <li>
            <strong>Resilience & Fault Tolerance:</strong> React <code>ErrorBoundary</code> component, dynamic Toast alerts, image error fallbacks, and 404 route handling.
          </li>
          <li>
            <strong>Performance Optimization:</strong> Route-level code-splitting with <code>React.lazy()</code> and <code>&lt;Suspense&gt;</code> fallback animations.
          </li>
        </ul>
      </div>

      {/* Data Management & Archival Controls */}
      <div className="insights-panel" style={{ marginTop: 32, marginBottom: 32 }}>
        <h3 className="panel-title">&#128190; Data Management & Archival Portal</h3>
        <p className="panel-subtitle">
          Export your entire catalogue and community feedback to a portable JSON backup, restore from file, or reseed defaults.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleExportBackup}
            disabled={processing}
          >
            &#128196; Export JSON Backup
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            accept=".json,application/json"
            style={{ display: 'none' }}
          />

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={processing}
          >
            &#128229; Import Backup File
          </button>

          <button
            type="button"
            className="btn btn-outline"
            style={{ borderColor: 'var(--color-ticket-red)', color: 'var(--color-ticket-red)' }}
            onClick={handleResetDefaults}
            disabled={processing}
          >
            &#8634; Reset to Demo Defaults
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>
        <div>Student: Vikrant Salunkhe (PRN: 125M1H006)</div>
        <div>Course: Advanced Web Technologies (SYMCA, Semester III)</div>
        <div>Guide: Prof. Dr. Avinash Chormale | Department of MCA, PCCOE, Pune</div>
      </div>
    </div>
  );
}
