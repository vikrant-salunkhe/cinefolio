import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getAllMovies,
  getMovieById,
  searchMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  createReview,
  getAllReviews,
  getReviewsByMovieId,
  deleteReview
} from './movieService.js';

describe('CineFolio Movie Service - CRUD & Filtering Test Suite', () => {
  it('should fetch all catalogue movies (Read)', async () => {
    const movies = await getAllMovies();
    assert.ok(Array.isArray(movies));
    assert.ok(movies.length > 0, 'Movies catalogue should not be empty');
  });

  it('should retrieve a specific movie by id (Read)', async () => {
    const movie = await getMovieById(1);
    assert.ok(movie !== null);
    assert.strictEqual(movie.id, 1);
    assert.strictEqual(typeof movie.title, 'string');
  });

  it('should search and filter movies by genre and query (Search & Filter)', async () => {
    const results = await searchMovies({ query: 'Nebula', genre: 'All', sortBy: 'title' });
    assert.ok(Array.isArray(results));
    assert.ok(results.some((m) => m.title.includes('Nebula')));
  });

  it('should sort movies by rating in descending order', async () => {
    const results = await searchMovies({ sortBy: 'rating' });
    assert.ok(results.length >= 2);
    for (let i = 0; i < results.length - 1; i++) {
      assert.ok(Number(results[i].rating) >= Number(results[i + 1].rating));
    }
  });

  it('should create, find, and delete a custom movie (CRUD Create & Delete)', async () => {
    const newMovieData = {
      title: 'AWT Test Movie 2026',
      year: 2026,
      genres: 'Drama, Mystery',
      rating: 9.2,
      runtime: 110,
      director: 'Vikrant Salunkhe',
      cast: 'Actor A, Actor B',
      synopsis: 'A test synopsis for evaluating the FA-2 automated test suite.'
    };

    const created = await createMovie(newMovieData);
    assert.ok(created.id);
    assert.strictEqual(created.title, 'AWT Test Movie 2026');

    // Verify it exists in catalogue
    const found = await getMovieById(created.id);
    assert.ok(found);
    assert.strictEqual(found.title, 'AWT Test Movie 2026');

    // Clean up / Delete
    const deleteRes = await deleteMovie(created.id);
    assert.strictEqual(deleteRes.success, true);

    const afterDelete = await getMovieById(created.id);
    assert.strictEqual(afterDelete, null);
  });

  it('should update an existing movie details (CRUD Update)', async () => {
    const movie = await getMovieById(2);
    assert.ok(movie);

    const originalTitle = movie.title;
    const updated = await updateMovie(2, {
      title: 'Paper Lanterns: Remastered',
      rating: 9.5,
      genres: 'Drama, Romance, Classic'
    });

    assert.strictEqual(updated.title, 'Paper Lanterns: Remastered');
    assert.strictEqual(updated.rating, 9.5);
    assert.ok(Array.isArray(updated.genres));
    assert.ok(updated.genres.includes('Classic'));

    // Revert back so other tests aren't affected
    await updateMovie(2, {
      title: originalTitle,
      rating: movie.rating,
      genres: movie.genres
    });
  });

  it('should create and retrieve reviews for a movie (CRUD Reviews)', async () => {
    const testReview = {
      author: 'Test Critic',
      rating: 10,
      comment: 'An absolute masterpiece of web development and cinematography.'
    };

    const review = await createReview(1, testReview);
    assert.ok(review.id);
    assert.strictEqual(review.author, 'Test Critic');
    assert.strictEqual(review.rating, 10);

    const reviews = await getReviewsByMovieId(1);
    assert.ok(reviews.some((r) => r.id === review.id));

    // Delete review
    await deleteReview(review.id);
    const updatedReviews = await getReviewsByMovieId(1);
    assert.ok(!updatedReviews.some((r) => r.id === review.id));
  });

  it('should fetch all audience reviews for insights analytics', async () => {
    const allReviews = await getAllReviews();
    assert.ok(Array.isArray(allReviews));
    assert.ok(allReviews.length > 0, 'Initial reviews should be populated');
    assert.ok(allReviews.some((r) => r.author === 'Aarav Sharma'));
  });
});
