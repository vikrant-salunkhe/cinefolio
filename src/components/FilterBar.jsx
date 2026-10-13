import React from 'react';
import { genreList } from '../data/movies.js';

export default function FilterBar({
  activeGenre,
  onGenreChange,
  sortBy,
  onSortChange,
  minRating = 0,
  onMinRatingChange
}) {
  return (
    <div className="filter-bar">
      <div className="chip-row">
        {genreList.map((genre) => (
          <button
            key={genre}
            className={`chip${genre === activeGenre ? ' active' : ''}`}
            onClick={() => onGenreChange(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="filter-controls-right">
        {onMinRatingChange && (
          <select
            className="sort-select"
            value={minRating}
            onChange={(e) => onMinRatingChange(Number(e.target.value))}
            aria-label="Filter by minimum rating"
          >
            <option value="0">All Ratings</option>
            <option value="7">★ 7.0+ & Up</option>
            <option value="8">★ 8.0+ & Up</option>
            <option value="8.5">★ 8.5+ & Up</option>
          </select>
        )}

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort movies"
        >
          <option value="title">Sort: Title (A-Z)</option>
          <option value="rating">Sort: Rating (High to Low)</option>
          <option value="year">Sort: Newest First</option>
        </select>
      </div>
    </div>
  );
}
