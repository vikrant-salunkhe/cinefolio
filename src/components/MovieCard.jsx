import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="ticket-card">
      <div className="ticket-poster-wrap">
        <img src={movie.poster} alt={`${movie.title} poster`} loading="lazy" />
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
        <div className="ticket-genres">{movie.genres.join(' / ')}</div>
      </div>
    </Link>
  );
}
