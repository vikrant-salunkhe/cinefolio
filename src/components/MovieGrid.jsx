import React from 'react';
import MovieCard from './MovieCard.jsx';

export default function MovieGrid({ movies, emptyMessage }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-title">No movies found</div>
        <p>{emptyMessage || 'Try a different search term or clear your filters.'}</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
