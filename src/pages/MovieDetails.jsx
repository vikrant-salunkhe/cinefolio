import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovieById, deleteMovie } from '../services/movieService.js';
import { useWatchlist } from '../context/WatchlistContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import ReviewSection from '../components/ReviewSection.jsx';
import EditMovieModal from '../components/EditMovieModal.jsx';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [movie, setMovie] = useState(undefined); // undefined = loading, null = not found
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    setMovie(undefined);
    getMovieById(id).then(setMovie);
  }, [id]);

  if (movie === undefined) {
    return <p className="page-subheading" style={{ marginTop: 40 }}>Loading movie details&hellip;</p>;
  }

  if (movie === null) {
    return (
      <div className="empty-state" style={{ marginTop: 40 }}>
        <div className="empty-state-title">Movie not found</div>
        <p>We couldn't find that title in the CineFolio archive.</p>
        <Link to="/" className="btn btn-outline" style={{ marginTop: 16 }}>
          Back to Box Office
        </Link>
      </div>
    );
  }

  const saved = isInWatchlist(movie.id);

  const handleWatchlistToggle = () => {
    if (saved) {
      removeFromWatchlist(movie.id);
      addToast(`Removed "${movie.title}" from Watchlist`, 'info');
    } else {
      addToWatchlist(movie);
      addToast(`Added "${movie.title}" to Watchlist!`, 'success');
    }
  };

  const handleShareMovie = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        addToast(`Link to "${movie.title}" copied to clipboard!`, 'info');
      } else {
        addToast('Sharing link: ' + window.location.href, 'info');
      }
    } catch {
      addToast('Could not copy link to clipboard', 'error');
    }
  };

  const handleDeleteMovie = async () => {
    if (!window.confirm(`Are you sure you want to delete "${movie.title}" from the catalogue?`)) {
      return;
    }
    try {
      await deleteMovie(movie.id);
      if (saved) removeFromWatchlist(movie.id);
      addToast(`"${movie.title}" was deleted from catalogue`, 'info');
      navigate('/');
    } catch (err) {
      addToast('Failed to delete movie', 'error');
    }
  };

  return (
    <>
      <div className="details-layout">
        <img
          className="details-poster"
          src={movie.poster}
          alt={`${movie.title} poster`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/400x600/151922/E8B44D?font=montserrat&text=${encodeURIComponent(
              movie.title
            )}`;
          }}
        />

        <div>
          <h1 className="details-title">{movie.title}</h1>
          <div className="details-meta">
            <span>{movie.year}</span>
            <span>{movie.runtime} min</span>
            <span>&#9733; {movie.rating} / 10</span>
            <span>Dir. {movie.director}</span>
          </div>

          <div>
            {Array.isArray(movie.genres) &&
              movie.genres.map((g) => (
                <Link
                  key={g}
                  to={`/?genre=${encodeURIComponent(g)}`}
                  className="genre-tag clickable-genre-tag"
                  title={`Browse other ${g} films`}
                >
                  {g}
                </Link>
              ))}
          </div>

          <p className="details-synopsis">{movie.synopsis}</p>

          <h3 className="details-section-title">Cast</h3>
          <p className="cast-list">
            {Array.isArray(movie.cast) && movie.cast.length > 0
              ? movie.cast.join(', ')
              : 'Cast information not listed.'}
          </p>

          <div className="details-actions">
            <button
              className={`btn ${saved ? 'btn-danger' : 'btn-primary'}`}
              onClick={handleWatchlistToggle}
            >
              {saved ? 'Remove from Watchlist' : '+ Add to Watchlist'}
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={handleShareMovie}
              title="Copy link to clipboard"
            >
              &#128279; Share
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsEditModalOpen(true)}
              title="Edit movie information"
            >
              &#9998; Edit Details
            </button>

            <button
              type="button"
              className="btn btn-outline"
              style={{ borderColor: 'var(--color-ticket-red)', color: 'var(--color-ticket-red)' }}
              onClick={handleDeleteMovie}
              title="Delete movie from database"
            >
              Delete Title
            </button>

            <Link to="/" className="btn btn-outline">
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>

      {/* Embedded Audience Reviews Module (CRUD Read, Create, Delete) */}
      <ReviewSection movieId={movie.id} movieTitle={movie.title} />

      {/* Full CRUD Edit Movie Modal */}
      <EditMovieModal
        movie={movie}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdated={(updated) => setMovie(updated)}
      />
    </>
  );
}
