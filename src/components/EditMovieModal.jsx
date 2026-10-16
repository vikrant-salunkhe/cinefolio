import React, { useState, useEffect } from 'react';
import { updateMovie } from '../services/movieService.js';
import { useToast } from '../context/ToastContext.jsx';

export default function EditMovieModal({ movie, isOpen, onClose, onUpdated }) {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    year: '',
    director: '',
    genres: '',
    rating: '',
    runtime: '',
    cast: '',
    synopsis: '',
    poster: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || '',
        year: movie.year || '',
        director: movie.director || '',
        genres: Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres || '',
        rating: movie.rating !== undefined ? String(movie.rating) : '7.0',
        runtime: movie.runtime !== undefined ? String(movie.runtime) : '120',
        cast: Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast || '',
        synopsis: movie.synopsis || '',
        poster: movie.poster || ''
      });
      setErrors({});
      setTouched({});
    }
  }, [movie, isOpen]);

  if (!isOpen || !movie) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      errs.title = 'Title must be at least 2 characters';
    }

    const yr = Number(formData.year);
    if (!yr || yr < 1888 || yr > 2030) {
      errs.year = 'Year must be between 1888 and 2030';
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      addToast('Please correct the validation errors before saving', 'error');
      return;
    }

    setSaving(true);
    try {
      const updated = await updateMovie(movie.id, formData);
      addToast(`"${updated.title}" successfully updated!`, 'success');
      if (onUpdated) onUpdated(updated);
      onClose();
    } catch (err) {
      addToast('Failed to update movie details', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Edit Movie Details</h3>
            <p className="modal-subtitle">Modify catalogue information for &ldquo;{movie.title}&rdquo;</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close modal">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="modal-form">
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label htmlFor="edit-title" className="form-label">
                Movie Title <span className="req">*</span>
              </label>
              <input
                id="edit-title"
                name="title"
                type="text"
                className={`form-input ${touched.title && errors.title ? 'input-error' : ''}`}
                value={formData.title}
                onChange={handleChange}
                onBlur={() => handleBlur('title')}
              />
              {touched.title && errors.title && <span className="field-error">{errors.title}</span>}
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="edit-year" className="form-label">
                Release Year <span className="req">*</span>
              </label>
              <input
                id="edit-year"
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
              <label htmlFor="edit-director" className="form-label">
                Director <span className="req">*</span>
              </label>
              <input
                id="edit-director"
                name="director"
                type="text"
                className={`form-input ${touched.director && errors.director ? 'input-error' : ''}`}
                value={formData.director}
                onChange={handleChange}
                onBlur={() => handleBlur('director')}
              />
              {touched.director && errors.director && (
                <span className="field-error">{errors.director}</span>
              )}
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="edit-genres" className="form-label">
                Genres (comma separated) <span className="req">*</span>
              </label>
              <input
                id="edit-genres"
                name="genres"
                type="text"
                className={`form-input ${touched.genres && errors.genres ? 'input-error' : ''}`}
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
              <label htmlFor="edit-rating" className="form-label">
                Rating (1.0 - 10.0) <span className="req">*</span>
              </label>
              <input
                id="edit-rating"
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
              <label htmlFor="edit-runtime" className="form-label">
                Runtime (minutes) <span className="req">*</span>
              </label>
              <input
                id="edit-runtime"
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
            <label htmlFor="edit-cast" className="form-label">
              Cast Members (comma separated)
            </label>
            <input
              id="edit-cast"
              name="cast"
              type="text"
              className="form-input"
              value={formData.cast}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-synopsis" className="form-label">
              Synopsis <span className="req">*</span>
            </label>
            <textarea
              id="edit-synopsis"
              name="synopsis"
              rows={3}
              className={`form-textarea ${touched.synopsis && errors.synopsis ? 'input-error' : ''}`}
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
            <label htmlFor="edit-poster" className="form-label">
              Poster Image URL
            </label>
            <input
              id="edit-poster"
              name="poster"
              type="url"
              className="form-input"
              value={formData.poster}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving Changes...' : 'Save Changes'}
            </button>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
