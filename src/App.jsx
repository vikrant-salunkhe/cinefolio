import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import Watchlist from './pages/Watchlist.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import { WatchlistProvider } from './context/WatchlistContext.jsx';
import './App.css';

export default function App() {
  return (
    <WatchlistProvider>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </WatchlistProvider>
  );
}
