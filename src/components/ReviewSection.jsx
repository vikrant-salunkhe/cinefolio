import React, { useState, useEffect } from 'react';
import { getReviewsByMovieId, createReview, deleteReview } from '../services/movieService.js';
import { useToast } from '../context/ToastContext.jsx';

export default function ReviewSection({ movieId, movieTitle }) {
  const { addToast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('8');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [movieId]);

  const loadReviews = async () => {
    setLoading(true);
    const data = await getReviewsByMovieId(movieId);
    setReviews(data);
    setLoading(false);
  };

  const validate = () => {
    const errs = {};
    if (!author.trim()) {
      errs.author = 'Reviewer name is required';
    } else if (author.trim().length < 2) {
      errs.author = 'Name must be at least 2 characters';
    }

    if (!comment.trim()) {
      errs.comment = 'Review comment cannot be empty';
    } else if (comment.trim().length < 10) {
      errs.comment = 'Review must be at least 10 characters';
    }

    const rNum = Number(rating);
    if (isNaN(rNum) || rNum < 1 || rNum > 10) {
      errs.rating = 'Rating must be between 1 and 10';
    }

    return errs;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ author: true, comment: true, rating: true });
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      addToast('Please correct form errors before submitting', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await createReview(movieId, { author, rating, comment });
      addToast('Review submitted successfully!', 'success');
      setAuthor('');
      setComment('');
      setRating('8');
      setTouched({});
      setErrors({});
      await loadReviews();
    } catch (err) {
      addToast('Failed to submit review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await deleteReview(reviewId);
      addToast('Review removed', 'info');
      await loadReviews();
    } catch (err) {
      addToast('Could not delete review', 'error');
    }
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <div>
          <h3 className="details-section-title" style={{ marginBottom: 4 }}>
            Audience Reviews ({reviews.length})
          </h3>
          {averageRating && (
            <span className="audience-avg-badge">
              &#9733; {averageRating} / 10 Average User Score
            </span>
          )}
        </div>
      </div>

      {/* Review Submission Form with Real-time Validation */}
      <form className="review-form" onSubmit={handleSubmit} noValidate>
        <h4 className="review-form-title">Leave a Review for {movieTitle}</h4>

        <div className="form-row">
          <div className="form-group" style={{ flex: 2 }}>
            <label htmlFor="rev-author" className="form-label">
              Your Name / Alias <span className="req">*</span>
            </label>
            <input
              id="rev-author"
              type="text"
              className={`form-input ${touched.author && errors.author ? 'input-error' : ''}`}
              placeholder="e.g., Ananya Deshmukh"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              onBlur={() => handleBlur('author')}
            />
            {touched.author && errors.author && (
              <span className="field-error">{errors.author}</span>
            )}
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="rev-rating" className="form-label">
              Rating (1–10) <span className="req">*</span>
            </label>
            <select
              id="rev-rating"
              className="form-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  &#9733; {n} / 10
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="rev-comment" className="form-label">
            Your Review / Thoughts <span className="req">*</span>
          </label>
          <textarea
            id="rev-comment"
            rows={3}
            className={`form-textarea ${touched.comment && errors.comment ? 'input-error' : ''}`}
            placeholder="Share your thoughts on the plot, performances, cinematography..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onBlur={() => handleBlur('comment')}
          />
          <div className="form-field-meta">
            {touched.comment && errors.comment ? (
              <span className="field-error">{errors.comment}</span>
            ) : (
              <span className="field-hint">Minimum 10 characters</span>
            )}
            <span className="char-count">{comment.length} chars</span>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Posting&hellip;' : 'Submit Review'}
        </button>
      </form>

      {/* Review List */}
      <div className="reviews-list">
        {loading ? (
          <p className="page-subheading">Loading audience feedback&hellip;</p>
        ) : reviews.length === 0 ? (
          <p className="field-hint" style={{ marginTop: 12 }}>
            No reviews yet. Be the first to share your thoughts on this title!
          </p>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-card-top">
                <span className="review-author">{rev.author}</span>
                <span className="review-badge">&#9733; {rev.rating} / 10</span>
              </div>
              <p className="review-comment">{rev.comment}</p>
              <div className="review-card-footer">
                <span className="review-date">{rev.createdAt}</span>
                <button
                  type="button"
                  className="review-del-btn"
                  onClick={() => handleDelete(rev.id)}
                  title="Delete review"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
