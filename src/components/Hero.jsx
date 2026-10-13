import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero({ movie }) {
  if (!movie) return null;

  return (
    <section className="hero" style={{ backgroundImage: `url(${movie.backdrop})` }}>
      <div className="hero-content">
        <div className="hero-eyebrow">Now Showing</div>
        <h1 className="hero-title">{movie.title}</h1>
        <div className="hero-meta">
          <span>{movie.year}</span>
          <span>&bull;</span>
          <span>{movie.runtime} min</span>
          <span>&bull;</span>
          <span>&#9733; {movie.rating}</span>
        </div>
        <p className="hero-synopsis">{movie.synopsis}</p>
        <Link to={`/movie/${movie.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </section>
  );
}
