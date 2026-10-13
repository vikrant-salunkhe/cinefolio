import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Watchlist() {
  const { watchlist, removeFromWatchlist, updateWatchlistStatus, updateWatchlistNote, clearWatchlist } =
    useWatchlist();
  const { addToast } = useToast();
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempNote, setTempNote] = useState('');

  const statuses = ['All', 'Plan to Watch', 'Watching', 'Completed'];

  const filteredMovies =
    filterStatus === 'All'
      ? watchlist
      : watchlist.filter((m) => (m.status || 'Plan to Watch') === filterStatus);

  const handleStatusChange = (id, newStatus, title) => {
    updateWatchlistStatus(id, newStatus);
    addToast(`"${title}" marked as ${newStatus}`, 'info');
  };

  const handleStartEditNote = (movie) => {
    setEditingNoteId(movie.id);
    setTempNote(movie.personalNote || '');
  };

  const handleSaveNote = (id) => {
    updateWatchlistNote(id, tempNote);
    setEditingNoteId(null);
    addToast('Watchlist note updated!', 'success');
  };

  const handleRemove = (id, title) => {
    removeFromWatchlist(id);
    addToast(`Removed "${title}" from Watchlist`, 'info');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      clearWatchlist();
      addToast('Watchlist cleared', 'info');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 className="page-heading">Your Personal Watchlist</h2>
          <p className="page-subheading">
            {watchlist.length > 0
              ? `${watchlist.length} film${watchlist.length === 1 ? '' : 's'} in your personal queue.`
              : 'Keep track of titles you want to watch or have already seen.'}
          </p>
        </div>

        {watchlist.length > 0 && (
          <button className="btn btn-outline" onClick={handleClearAll}>
            Clear Entire Watchlist
          </button>
        )}
      </div>

      {/* Filter by status tabs */}
      {watchlist.length > 0 && (
        <div className="filter-chips-row" style={{ marginTop: 12, marginBottom: 24 }}>
          {statuses.map((st) => (
            <button
              key={st}
              className={`filter-chip ${filterStatus === st ? 'active' : ''}`}
              onClick={() => setFilterStatus(st)}
            >
              {st} {st !== 'All' ? `(${watchlist.filter((m) => (m.status || 'Plan to Watch') === st).length})` : `(${watchlist.length})`}
            </button>
          ))}
        </div>
      )}

      {filteredMovies.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-title">
            {watchlist.length === 0 ? 'Your Watchlist is empty' : `No movies under "${filterStatus}"`}
          </div>
          <p>
            {watchlist.length === 0
              ? 'Browse the catalogue and click "+ Add to Watchlist" on any title.'
              : 'Try selecting another status tab or add new movies.'}
          </p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-block' }}>
            Explore Catalogue
          </Link>
        </div>
      ) : (
        <div className="watchlist-table-container">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="watchlist-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="watchlist-card-thumb"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/400x600/151922/E8B44D?font=montserrat&text=${encodeURIComponent(
                      movie.title
                    )}`;
                  }}
                />
              </Link>

              <div className="watchlist-card-body">
                <div className="watchlist-card-header">
                  <div>
                    <Link to={`/movie/${movie.id}`} className="watchlist-card-title">
                      {movie.title}
                    </Link>
                    <div className="watchlist-card-meta">
                      <span>{movie.year}</span>
                      <span>&#9733; {movie.rating}</span>
                      <span>{movie.runtime}m</span>
                      <span>Dir. {movie.director}</span>
                    </div>
                  </div>

                  <button
                    className="btn-link-danger"
                    onClick={() => handleRemove(movie.id, movie.title)}
                    title="Remove from Watchlist"
                  >
                    Remove
                  </button>
                </div>

                <div className="watchlist-controls">
                  <div className="watchlist-status-select-wrap">
                    <label className="watchlist-label">Watch Status:</label>
                    <select
                      className="form-select watchlist-select"
                      value={movie.status || 'Plan to Watch'}
                      onChange={(e) => handleStatusChange(movie.id, e.target.value, movie.title)}
                    >
                      <option value="Plan to Watch">Plan to Watch</option>
                      <option value="Watching">Currently Watching</option>
                      <option value="Completed">Completed / Seen</option>
                    </select>
                  </div>

                  {/* Personal Note */}
                  <div className="watchlist-note-wrap">
                    {editingNoteId === movie.id ? (
                      <div className="note-editor">
                        <input
                          type="text"
                          className="form-input note-input"
                          placeholder="Add private note (e.g. Recommended by friend)..."
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                        />
                        <button className="btn btn-primary btn-sm" onClick={() => handleSaveNote(movie.id)}>
                          Save
                        </button>
                        <button className="btn btn-outline btn-sm" onClick={() => setEditingNoteId(null)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="note-display" onClick={() => handleStartEditNote(movie)}>
                        <span className="note-text">
                          {movie.personalNote ? `Note: "${movie.personalNote}"` : '+ Add a note'}
                        </span>
                        <span className="note-edit-icon">&#9998;</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
