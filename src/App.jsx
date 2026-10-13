import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { WatchlistProvider } from './context/WatchlistContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import './App.css';

// Performance optimization: Route-level code splitting with React.lazy
const Home = lazy(() => import('./pages/Home.jsx'));
const MovieDetails = lazy(() => import('./pages/MovieDetails.jsx'));
const Watchlist = lazy(() => import('./pages/Watchlist.jsx'));
const SubmitMovie = lazy(() => import('./pages/SubmitMovie.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function LoadingFallback() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div className="loading-spinner"></div>
      <p className="page-subheading" style={{ marginTop: 16 }}>
        Loading cinema experience&hellip;
      </p>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <WatchlistProvider>
          <Navbar />
          <main className="app-main">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/submit-movie" element={<SubmitMovie />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </WatchlistProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
