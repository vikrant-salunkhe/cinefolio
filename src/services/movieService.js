import mockMovies from '../data/movies.js';

/**
 * Movie Service
 * ---------------------------------------------------------
 * Phase I uses an in-memory mock dataset so the app is fully
 * functional offline and doesn't depend on an external API key.
 *
 * Phase II plan: replace the bodies of these functions with real
 * fetch() calls to a provider such as OMDb or TMDB, e.g.:
 *
 *   const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
 *   const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
 *   const data = await res.json();
 *
 * Keeping all data access behind this service means every component
 * in src/pages and src/components stays unaware of where the data
 * actually comes from, so switching to a live API later requires no
 * changes outside this file.
 */

const SIMULATED_LATENCY_MS = 250;

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS));
}

export async function getAllMovies() {
  return delay([...mockMovies]);
}

export async function getMovieById(id) {
  const movie = mockMovies.find((m) => m.id === Number(id));
  return delay(movie || null);
}

export async function searchMovies({ query = '', genre = 'All', sortBy = 'title' } = {}) {
  let results = [...mockMovies];

  if (query.trim()) {
    const q = query.trim().toLowerCase();
    results = results.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some((actor) => actor.toLowerCase().includes(q))
    );
  }

  if (genre && genre !== 'All') {
    results = results.filter((m) => m.genres.includes(genre));
  }

  results.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'year') return b.year - a.year;
    return a.title.localeCompare(b.title);
  });

  return delay(results);
}

export async function getFeaturedMovie() {
  const featured = mockMovies.find((m) => m.featured) || mockMovies[0];
  return delay(featured);
}
