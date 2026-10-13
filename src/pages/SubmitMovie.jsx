import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createMovie, fetchLiveApiMovie } from '../services/movieService.js';
import { useToast } from '../context/ToastContext.jsx';

export default function SubmitMovie() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    director: '',
    genres: 'Drama, Sci-Fi',
    rating: '7.5',
    runtime: '120',
    cast: '',
    synopsis: '',
    poster: '',
    featured: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiSearchQuery, setApiSearchQuery] = useState('');
  const [fetchingApi, setFetchingApi] = useState(false);

  // Quick live API autofill feature for demonstration
  const handleApiAutofill = async () => {
    if (!apiSearchQuery.trim()) {
      addToast('Please enter a movie title to search via API', 'info');
      return;
    }
    setFetchingApi(true);
    try {
      const liveMovie = await fetchLiveApiMovie(apiSearchQuery);
      if (liveMovie) {
        setFormData({
          title: liveMovie.title,
          year: liveMovie.year,
          director: liveMovie.director,
          genres: liveMovie.genres.join(', '),
          rating: String(liveMovie.rating),
          runtime: String(liveMovie.runtime),
          cast: liveMovie.cast.join(', '),
          synopsis: liveMovie.synopsis,
          poster: liveMovie.poster,
          featured: false
        });
        setErrors({});
        addToast(`Found details for "${liveMovie.title}" via Live API!`, 'success');
      } else {
        addToast('No movie found via online API. You can enter manually below.', 'info');
      }
    } catch (err) {
      addToast('API fetch error. Please fill manually.', 'error');
    } finally {
      setFetchingApi(false);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      errs.title = 'Title must be at least 2 characters';
    }

    const yr = Number(formData.year);
    if (!yr || yr < 1888 || yr > 2030) {
      errs.year = 'Enter a valid year between 1888 and 2030';
    }

    if (!formData.director.trim()) {
      errs.director = 'Director name is required';
    }

    if (!formData.genres.trim()) {
      errs.genres = 'At least one genre is required';
    }

    const r = Number(formData.rating);
    if (isNaN(r) || r < 1 || r > 10) {
      errs.rating = 'Rating must be between 1.0 and 10.0';
    }

    const run = Number(formData.runtime);
    if (!run || run <= 0) {
      errs.runtime = 'Runtime must be a positive number in minutes';
    }

    if (!formData.synopsis.trim()) {
      errs.synopsis = 'Synopsis is required';
    } else if (formData.synopsis.trim().length < 15) {
      errs.synopsis = 'Synopsis should be at least 15 characters';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      addToast('Please correct the validation errors in the form', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const created = await createMovie(formData);
      addToast(`"${created.title}" successfully added to the catalogue!`, 'success');
      navigate(`/movie/${created.id}`);
    } catch (err) {
      addToast('Failed to add movie', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <h2 className="page-heading">Add Movie to Catalogue</h2>
      <p className="page-subheading">
        Submit a new film to CineFolio with custom details, or autofill from an online API.
      </p>

      {/* Online API Autofill Assist Banner */}
      <div className="api-autofill-box">
        <label className="form-label" style={{ marginBottom: 6 }}>
          Quick Autofill via Live API
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="text"
            className="form-input"
            placeholder="Type any movie title (e.g. Inception, Interstellar, Dune)..."
            value={apiSearchQuery}
            onChange={(e) => setApiSearchQuery(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline"
            style={{ whiteSpace: 'nowrap' }}
            onClick={handleApiAutofill}
            disabled={fetchingApi}
          >
            {fetchingApi ? 'Searching...' : 'Autofill'}
          </button>
        </div>
      </div>

      <form className="submit-movie-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group" style={{ flex: 2 }}>
            <label htmlFor="movie-title" className="form-label">
              Movie Title <span className="req">*</span>
            </label>
            <input
              id="movie-title"
              name="title"
              type="text"
              className={`form-input ${touched.title && errors.title ? 'input-error' : ''}`}
              placeholder="e.g. The Grand Budapest Hotel"
              value={formData.title}
              onChange={handleChange}
              onBlur={() => handleBlur('title')}
            />
            {touched.title && errors.title && <span className="field-error">{errors.title}</span>}
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="movie-year" className="form-label">
              Release Year <span className="req">*</span>
            </label>
            <input
              id="movie-year"
              name="year"
              type="number"
              className={`form-input ${touched.year && errors.year ? 'input-error' : ''}`}
              value={formData.year}
              onChange={handleChange}
              onBlur={() => handleBlur('year')}
            />
            {touched.year && errors.year && <span className="field-error">{errors.year}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="movie-director" className="form-label">
              Director <span className="req">*</span>
            </label>
            <input
              id="movie-director"
              name="director"
              type="text"
              className={`form-input ${touched.director && errors.director ? 'input-error' : ''}`}
              placeholder="e.g. Wes Anderson"
              value={formData.director}
              onChange={handleChange}
              onBlur={() => handleBlur('director')}
            />
            {touched.director && errors.director && (
              <span className="field-error">{errors.director}</span>
            )}
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="movie-genres" className="form-label">
              Genres (comma separated) <span className="req">*</span>
            </label>
            <input
              id="movie-genres"
              name="genres"
              type="text"
              className={`form-input ${touched.genres && errors.genres ? 'input-error' : ''}`}
              placeholder="e.g. Comedy, Drama, Adventure"
              value={formData.genres}
              onChange={handleChange}
              onBlur={() => handleBlur('genres')}
            />
            {touched.genres && errors.genres && (
              <span className="field-error">{errors.genres}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="movie-rating" className="form-label">
              Rating (1.0 - 10.0) <span className="req">*</span>
            </label>
            <input
              id="movie-rating"
              name="rating"
              type="number"
              step="0.1"
              className={`form-input ${touched.rating && errors.rating ? 'input-error' : ''}`}
              value={formData.rating}
              onChange={handleChange}
              onBlur={() => handleBlur('rating')}
            />
            {touched.rating && errors.rating && (
              <span className="field-error">{errors.rating}</span>
            )}
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="movie-runtime" className="form-label">
              Runtime (minutes) <span className="req">*</span>
            </label>
            <input
              id="movie-runtime"
              name="runtime"
              type="number"
              className={`form-input ${touched.runtime && errors.runtime ? 'input-error' : ''}`}
              value={formData.runtime}
              onChange={handleChange}
              onBlur={() => handleBlur('runtime')}
            />
            {touched.runtime && errors.runtime && (
              <span className="field-error">{errors.runtime}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="movie-cast" className="form-label">
            Cast Members (comma separated)
          </label>
          <input
            id="movie-cast"
            name="cast"
            type="text"
            className="form-input"
            placeholder="e.g. Ralph Fiennes, Tony Revolori, Saoirse Ronan"
            value={formData.cast}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="movie-synopsis" className="form-label">
            Synopsis / Summary <span className="req">*</span>
          </label>
          <textarea
            id="movie-synopsis"
            name="synopsis"
            rows={4}
            className={`form-textarea ${touched.synopsis && errors.synopsis ? 'input-error' : ''}`}
            placeholder="A short summary of the plot and premises..."
            value={formData.synopsis}
            onChange={handleChange}
            onBlur={() => handleBlur('synopsis')}
          />
          <div className="form-field-meta">
            {touched.synopsis && errors.synopsis ? (
              <span className="field-error">{errors.synopsis}</span>
            ) : (
              <span className="field-hint">Minimum 15 characters</span>
            )}
            <span className="char-count">{formData.synopsis.length} chars</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="movie-poster" className="form-label">
            Poster Image URL (optional)
          </label>
          <input
            id="movie-poster"
            name="poster"
            type="url"
            className="form-input"
            placeholder="https://... (Leave blank for an automated cinema poster placeholder)"
            value={formData.poster}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Adding Movie...' : 'Save & Publish Movie'}
          </button>
          <Link to="/" className="btn btn-outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
