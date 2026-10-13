import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieById } from '../services/movieService.js';
import { useWatchlist } from '../context/WatchlistContext.jsx';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(undefined); // undefined = loading, null = not found
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    setMovie(undefined);
    getMovieById(id).then(setMovie);
  }, [id]);

  if (movie === undefined) {
    return <p className="page-subheading" style={{ marginTop: 40 }}>Loading movie&hellip;</p>;
  }

  if (movie === null) {
    return (
      <div className="empty-state" style={{ marginTop: 40 }}>
        <div className="empty-state-title">Movie not found</div>
        <p>We couldn't find that title in the catalogue.</p>
        <Link to="/" className="btn btn-outline" style={{ marginTop: 16 }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const saved = isInWatchlist(movie.id);

  return (
    <div className="details-layout">
      <img className="details-poster" src={movie.poster} alt={`${movie.title} poster`} />

      <div>
        <h1 className="details-title">{movie.title}</h1>
        <div className="details-meta">
          <span>{movie.year}</span>
          <span>{movie.runtime} min</span>
          <span>&#9733; {movie.rating} / 10</span>
          <span>Dir. {movie.director}</span>
        </div>

        <div>
          {movie.genres.map((g) => (
            <span key={g} className="genre-tag">
              {g}
            </span>
          ))}
        </div>

        <p className="details-synopsis">{movie.synopsis}</p>

        <h3 className="details-section-title">Cast</h3>
        <p className="cast-list">{movie.cast.join(', ')}</p>

        <div className="details-actions">
          {saved ? (
            <button className="btn btn-danger" onClick={() => removeFromWatchlist(movie.id)}>
              Remove from Watchlist
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => addToWatchlist(movie)}>
              + Add to Watchlist
            </button>
          )}
          <Link to="/" className="btn btn-outline">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
