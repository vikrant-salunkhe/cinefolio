import initialMovies from '../data/movies.js';

/**
 * Movie & Review Service (Phase II - Full CRUD & Local Storage Persistence)
 * -------------------------------------------------------------------------
 * Implements Create, Read, Update, and Delete operations for both
 * movies and user reviews. Data is stored in localStorage so additions,
 * updates, and deletions survive page refreshes.
 */

const MOVIES_STORAGE_KEY = 'cinefolio_movies_v2';
const REVIEWS_STORAGE_KEY = 'cinefolio_reviews_v1';
const SIMULATED_LATENCY_MS = 150;

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS));
}

// Initial mock reviews to populate details right away
const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    movieId: 1,
    author: 'Aarav Sharma',
    rating: 9,
    comment: 'Visually stunning space odyssey! The sound design and tension in the second act were brilliant.',
    createdAt: '2026-09-12'
  },
  {
    id: 'rev-2',
    movieId: 1,
    author: 'Pooja Kulkarni',
    rating: 8,
    comment: 'Great pacing and thought-provoking plot. A fresh take on modern sci-fi.',
    createdAt: '2026-09-18'
  },
  {
    id: 'rev-3',
    movieId: 2,
    author: 'Vikrant S.',
    rating: 8,
    comment: 'Warm, emotional storytelling with poetic visuals. Loved the score.',
    createdAt: '2026-10-01'
  }
];

// In-memory fallback for environments without window.localStorage (e.g. Node test runner)
const memoryStore = {};

function getStorageItem(key) {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return memoryStore[key] || null;
}

function setStorageItem(key, value) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value);
  } else {
    memoryStore[key] = value;
  }
}

// Helper to read movies from storage
function getStoredMovies() {
  try {
    const raw = getStorageItem(MOVIES_STORAGE_KEY);
    if (!raw) {
      setStorageItem(MOVIES_STORAGE_KEY, JSON.stringify(initialMovies));
      return [...initialMovies];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to read movies from storage', err);
    return [...initialMovies];
  }
}

function saveStoredMovies(movies) {
  try {
    setStorageItem(MOVIES_STORAGE_KEY, JSON.stringify(movies));
  } catch (err) {
    console.warn('Failed to save movies to storage', err);
  }
}

// Helper to read reviews from storage
function getStoredReviews() {
  try {
    const raw = getStorageItem(REVIEWS_STORAGE_KEY);
    if (!raw) {
      setStorageItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      return [...INITIAL_REVIEWS];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to read reviews from storage', err);
    return [...INITIAL_REVIEWS];
  }
}

function saveStoredReviews(reviews) {
  try {
    setStorageItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.warn('Failed to save reviews to storage', err);
  }
}

/* -------------------------------------------------------------
 * READ OPERATIONS
 * ----------------------------------------------------------- */

export async function getAllMovies() {
  const movies = getStoredMovies();
  return delay(movies);
}

export async function getMovieById(id) {
  const movies = getStoredMovies();
  const movie = movies.find((m) => String(m.id) === String(id));
  return delay(movie || null);
}

export async function getFeaturedMovie() {
  const movies = getStoredMovies();
  const featured = movies.find((m) => m.featured) || movies[0];
  return delay(featured || null);
}

export async function searchMovies({
  query = '',
  genre = 'All',
  sortBy = 'title',
  minRating = 0
} = {}) {
  let list = getStoredMovies();

  if (query.trim()) {
    const q = query.trim().toLowerCase();
    list = list.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.director && m.director.toLowerCase().includes(q)) ||
        (Array.isArray(m.cast) && m.cast.some((actor) => actor.toLowerCase().includes(q))) ||
        (m.synopsis && m.synopsis.toLowerCase().includes(q))
    );
  }

  if (genre && genre !== 'All') {
    list = list.filter((m) => Array.isArray(m.genres) && m.genres.includes(genre));
  }

  if (minRating > 0) {
    list = list.filter((m) => Number(m.rating) >= Number(minRating));
  }

  list.sort((a, b) => {
    if (sortBy === 'rating') return Number(b.rating) - Number(a.rating);
    if (sortBy === 'year') return Number(b.year) - Number(a.year);
    return a.title.localeCompare(b.title);
  });

  return delay(list);
}

/* -------------------------------------------------------------
 * CREATE, UPDATE, DELETE (CRUD) FOR MOVIES
 * ----------------------------------------------------------- */

export async function createMovie(movieData) {
  const movies = getStoredMovies();
  const newId = Date.now();
  const newMovie = {
    id: newId,
    title: movieData.title.trim(),
    year: Number(movieData.year),
    genres: Array.isArray(movieData.genres)
      ? movieData.genres
      : movieData.genres.split(',').map((g) => g.trim()).filter(Boolean),
    rating: Number(movieData.rating) || 7.0,
    runtime: Number(movieData.runtime) || 120,
    director: movieData.director.trim(),
    cast: Array.isArray(movieData.cast)
      ? movieData.cast
      : movieData.cast.split(',').map((c) => c.trim()).filter(Boolean),
    poster:
      movieData.poster?.trim() ||
      `https://placehold.co/400x600/151922/E8B44D?font=montserrat&text=${encodeURIComponent(
        movieData.title
      )}`,
    backdrop:
      movieData.backdrop?.trim() ||
      `https://placehold.co/1200x500/0B0E14/E8B44D?font=montserrat&text=${encodeURIComponent(
        movieData.title
      )}`,
    synopsis: movieData.synopsis.trim(),
    featured: Boolean(movieData.featured),
    custom: true
  };

  const updated = [newMovie, ...movies];
  saveStoredMovies(updated);
  return delay(newMovie);
}

export async function updateMovie(id, updateData) {
  const movies = getStoredMovies();
  const idx = movies.findIndex((m) => String(m.id) === String(id));
  if (idx === -1) throw new Error('Movie not found');

  const existing = movies[idx];
  const updatedMovie = {
    ...existing,
    ...updateData,
    id: existing.id,
    year: updateData.year !== undefined ? Number(updateData.year) : existing.year,
    rating: updateData.rating !== undefined ? Number(updateData.rating) : existing.rating,
    runtime: updateData.runtime !== undefined ? Number(updateData.runtime) : existing.runtime,
    genres: updateData.genres !== undefined
      ? (Array.isArray(updateData.genres)
          ? updateData.genres
          : updateData.genres.split(',').map((g) => g.trim()).filter(Boolean))
      : existing.genres,
    cast: updateData.cast !== undefined
      ? (Array.isArray(updateData.cast)
          ? updateData.cast
          : updateData.cast.split(',').map((c) => c.trim()).filter(Boolean))
      : existing.cast
  };

  movies[idx] = updatedMovie;
  saveStoredMovies(movies);
  return delay(updatedMovie);
}

export async function deleteMovie(id) {
  const movies = getStoredMovies();
  const filtered = movies.filter((m) => String(m.id) !== String(id));
  saveStoredMovies(filtered);

  // Also clean up associated reviews
  const reviews = getStoredReviews().filter((r) => String(r.movieId) !== String(id));
  saveStoredReviews(reviews);

  return delay({ success: true, id });
}

/* -------------------------------------------------------------
 * CRUD OPERATIONS FOR REVIEWS
 * ----------------------------------------------------------- */

export async function getAllReviews() {
  const reviews = getStoredReviews();
  return delay(reviews);
}

export async function getReviewsByMovieId(movieId) {
  const reviews = getStoredReviews();
  const filtered = reviews.filter((r) => String(r.movieId) === String(movieId));
  return delay(filtered);
}

export async function createReview(movieId, reviewData) {
  const reviews = getStoredReviews();
  const newReview = {
    id: `rev-${Date.now()}`,
    movieId: Number(movieId),
    author: reviewData.author.trim(),
    rating: Number(reviewData.rating),
    comment: reviewData.comment.trim(),
    createdAt: new Date().toISOString().split('T')[0]
  };

  const updated = [newReview, ...reviews];
  saveStoredReviews(updated);
  return delay(newReview);
}

export async function deleteReview(reviewId) {
  const reviews = getStoredReviews();
  const filtered = reviews.filter((r) => r.id !== reviewId);
  saveStoredReviews(filtered);
  return delay({ success: true, id: reviewId });
}

/* -------------------------------------------------------------
 * OPTIONAL EXTERNAL LIVE API SEARCH (e.g. Free OMDB / Fallback)
 * ----------------------------------------------------------- */

export async function fetchLiveApiMovie(searchTerm) {
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=trilogy&t=${encodeURIComponent(searchTerm)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.Response === 'False') return null;

    return {
      title: data.Title,
      year: parseInt(data.Year, 10) || 2024,
      director: data.Director !== 'N/A' ? data.Director : 'Unknown',
      cast: data.Actors !== 'N/A' ? data.Actors.split(', ') : [],
      genres: data.Genre !== 'N/A' ? data.Genre.split(', ') : ['Cinema'],
      rating: parseFloat(data.imdbRating) || 7.5,
      runtime: parseInt(data.Runtime, 10) || 120,
      synopsis: data.Plot !== 'N/A' ? data.Plot : 'No synopsis available.',
      poster: data.Poster !== 'N/A' ? data.Poster : ''
    };
  } catch (err) {
    console.warn('Live API request skipped or offline:', err);
    return null;
  }
}

/* -------------------------------------------------------------
 * DATA MANAGEMENT (EXPORT, IMPORT, RESET)
 * ----------------------------------------------------------- */

export async function exportDataBackup() {
  const movies = getStoredMovies();
  const reviews = getStoredReviews();
  const backup = {
    app: 'CineFolio',
    version: '2.0.0',
    exportedAt: new Date().toISOString(),
    moviesCount: movies.length,
    reviewsCount: reviews.length,
    data: {
      movies,
      reviews
    }
  };
  return delay(backup);
}

export async function importDataBackup(backupPayload) {
  if (!backupPayload || typeof backupPayload !== 'object') {
    throw new Error('Invalid backup format');
  }

  const movies = backupPayload.data?.movies || backupPayload.movies;
  if (!Array.isArray(movies) || movies.length === 0) {
    throw new Error('Backup must contain a non-empty movies array');
  }

  saveStoredMovies(movies);

  const reviews = backupPayload.data?.reviews || backupPayload.reviews;
  if (Array.isArray(reviews)) {
    saveStoredReviews(reviews);
  }

  return delay({
    success: true,
    moviesCount: movies.length,
    reviewsCount: Array.isArray(reviews) ? reviews.length : 0
  });
}

export async function resetToDefaults() {
  saveStoredMovies([...initialMovies]);
  saveStoredReviews([...INITIAL_REVIEWS]);
  return delay({ success: true });
}

