import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import FilterBar from '../components/FilterBar.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import { searchMovies, getFeaturedMovie } from '../services/movieService.js';
import { useDebounce } from '../hooks/useDebounce.js';

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';

  const [featured, setFeatured] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [searchInput, setSearchInput] = useState(urlQuery);
  const debouncedSearch = useDebounce(searchInput, 250);

  const [genre, setGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [minRating, setMinRating] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Sync urlQuery when user navigates or types in nav
  useEffect(() => {
    setSearchInput(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    getFeaturedMovie().then(setFeatured);
  }, []);

  // Fetch movies when filters or debounced search change
  useEffect(() => {
    setLoading(true);
    searchMovies({
      query: debouncedSearch,
      genre,
      sortBy,
      minRating
    }).then((results) => {
      setMovies(results);
      setLoading(false);
      setCurrentPage(1); // reset to page 1 on filter changes
    });
  }, [debouncedSearch, genre, sortBy, minRating]);

  // Paginated movies
  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE) || 1;
  const paginatedMovies = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return movies.slice(start, start + ITEMS_PER_PAGE);
  }, [movies, currentPage]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchInput(val);
    if (val.trim()) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setSearchParams({});
    setGenre('All');
    setSortBy('title');
    setMinRating(0);
    setCurrentPage(1);
  };

  return (
    <>
      {!debouncedSearch && <Hero movie={featured} />}

      <div className="catalogue-header-section">
        <div>
          <h2 className="page-heading">
            {debouncedSearch ? `Search Results for "${debouncedSearch}"` : 'Browse the Catalogue'}
          </h2>
          <p className="page-subheading">
            {debouncedSearch
              ? `Found ${movies.length} title${movies.length === 1 ? '' : 's'} matching your keywords.`
              : 'Discover acclaimed films, filter by genre or rating, and track your favorites.'}
          </p>
        </div>

        {/* In-page live search input */}
        <div className="inline-search-wrap">
          <input
            type="text"
            className="form-input inline-search-input"
            placeholder="Live search by title, actor, director..."
            value={searchInput}
            onChange={handleSearchChange}
          />
          {searchInput && (
            <button
              className="inline-search-clear"
              onClick={() => handleSearchChange({ target: { value: '' } })}
              title="Clear search"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      <FilterBar
        activeGenre={genre}
        onGenreChange={setGenre}
        sortBy={sortBy}
        onSortChange={setSortBy}
        minRating={minRating}
        onMinRatingChange={setMinRating}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <p className="page-subheading">Loading movies from catalogue&hellip;</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-title">No movies match your criteria</div>
          <p>Try loosening your search query, genre tags, or minimum rating filter.</p>
          <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={handleClearFilters}>
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <MovieGrid movies={paginatedMovies} />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-bar">
              <button
                className="btn btn-outline btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                &larr; Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages} ({movies.length} total titles)
              </span>
              <button
                className="btn btn-outline btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
