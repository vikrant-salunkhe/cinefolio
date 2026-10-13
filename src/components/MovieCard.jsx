import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const fallbackPoster = `https://placehold.co/400x600/151922/E8B44D?font=montserrat&text=${encodeURIComponent(
    movie.title
  )}`;

  return (
    <Link to={`/movie/${movie.id}`} className="ticket-card">
      <div className="ticket-poster-wrap">
        <img
          src={movie.poster || fallbackPoster}
          alt={`${movie.title} poster`}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackPoster;
          }}
        />
        <span className="ticket-rating">&#9733; {movie.rating}</span>
      </div>
      <div className="ticket-perforation" />
      <div className="ticket-body">
        <div className="ticket-title">{movie.title}</div>
        <div className="ticket-meta">
          <span>{movie.year}</span>
          <span>&bull;</span>
          <span>{movie.runtime} min</span>
        </div>
        <div className="ticket-genres">
          {Array.isArray(movie.genres) ? movie.genres.join(' / ') : movie.genres}
        </div>
      </div>
    </Link>
  );
}
