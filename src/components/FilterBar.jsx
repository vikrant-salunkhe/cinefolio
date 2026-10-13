import React from 'react';
import { genreList } from '../data/movies.js';

export default function FilterBar({ activeGenre, onGenreChange, sortBy, onSortChange }) {
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
  );
}
