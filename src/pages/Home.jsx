import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import FilterBar from '../components/FilterBar.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import { searchMovies, getFeaturedMovie } from '../services/movieService.js';

export default function Home() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [featured, setFeatured] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    getFeaturedMovie().then(setFeatured);
  }, []);

  useEffect(() => {
    setLoading(true);
    searchMovies({ query: initialQuery, genre, sortBy }).then((results) => {
      setMovies(results);
      setLoading(false);
    });
  }, [initialQuery, genre, sortBy]);

  return (
    <>
      {!initialQuery && <Hero movie={featured} />}

      <h2 className="page-heading">{initialQuery ? `Results for "${initialQuery}"` : 'Browse the Catalogue'}</h2>
      <p className="page-subheading">
        {initialQuery
          ? `${movies.length} movie${movies.length === 1 ? '' : 's'} matched your search.`
          : 'Filter by genre or sort the collection to find something to watch tonight.'}
      </p>

      <FilterBar activeGenre={genre} onGenreChange={setGenre} sortBy={sortBy} onSortChange={setSortBy} />

      {loading ? <p className="page-subheading">Loading movies&hellip;</p> : <MovieGrid movies={movies} />}
    </>
  );
}
