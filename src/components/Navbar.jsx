import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext.jsx';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(query.trim() ? `/?q=${encodeURIComponent(query.trim())}` : '/');
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">&#127916;</span> CineFolio
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Catalogue
          </NavLink>
          <NavLink to="/watchlist" className={({ isActive }) => (isActive ? 'active' : '')}>
            Watchlist
            {watchlist.length > 0 && <span className="nav-badge">{watchlist.length}</span>}
          </NavLink>
          <NavLink to="/submit-movie" className={({ isActive }) => (isActive ? 'active' : '')}>
            + Add Movie
          </NavLink>
          <NavLink to="/insights" className={({ isActive }) => (isActive ? 'active' : '')}>
            Insights
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            About
          </NavLink>
        </nav>

        <form className="search-form" onSubmit={handleSubmit} role="search">
          <input
            type="search"
            placeholder="Search title, director, actor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search movies"
          />
        </form>
      </div>
    </header>
  );
}
