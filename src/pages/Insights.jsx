import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllMovies, getAllReviews } from '../services/movieService.js';
import { useWatchlist } from '../context/WatchlistContext.jsx';

export default function Insights() {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { watchlist } = useWatchlist();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [moviesData, reviewsData] = await Promise.all([
      getAllMovies(),
      getAllReviews()
    ]);
    setMovies(moviesData);
    setReviews(reviewsData);
    setLoading(false);
  };

  // Memoized analytics calculations
  const analytics = useMemo(() => {
    if (!movies.length) return null;

    const totalMovies = movies.length;
    const customMoviesCount = movies.filter((m) => m.custom).length;
    const avgRating = (
      movies.reduce((sum, m) => sum + Number(m.rating || 0), 0) / totalMovies
    ).toFixed(1);
    const avgRuntime = Math.round(
      movies.reduce((sum, m) => sum + Number(m.runtime || 0), 0) / totalMovies
    );

    // Genre distribution
    const genreCounts = {};
    const genreRatings = {};
    movies.forEach((m) => {
      const genres = Array.isArray(m.genres) ? m.genres : [];
      genres.forEach((g) => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
        if (!genreRatings[g]) genreRatings[g] = [];
        genreRatings[g].push(Number(m.rating));
      });
    });

    const genreStats = Object.keys(genreCounts)
      .map((g) => ({
        genre: g,
        count: genreCounts[g],
        percentage: Math.round((genreCounts[g] / totalMovies) * 100),
        avgRating: (
          genreRatings[g].reduce((a, b) => a + b, 0) / genreRatings[g].length
        ).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count);

    // Top 5 Leaderboard
    const top5 = [...movies]
      .sort((a, b) => Number(b.rating) - Number(a.rating))
      .slice(0, 5);

    // Watchlist breakdown
    const watchlistTotal = watchlist.length;
    const watchlistStatusCounts = {
      'Plan to Watch': watchlist.filter((m) => (m.status || 'Plan to Watch') === 'Plan to Watch').length,
      'Watching': watchlist.filter((m) => m.status === 'Watching').length,
      'Completed': watchlist.filter((m) => m.status === 'Completed').length
    };

    // Reviews analytics
    const totalReviews = reviews.length;
    const avgReviewRating = totalReviews
      ? (reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / totalReviews).toFixed(1)
      : 'N/A';

    return {
      totalMovies,
      customMoviesCount,
      avgRating,
      avgRuntime,
      genreStats,
      top5,
      watchlistTotal,
      watchlistStatusCounts,
      totalReviews,
      avgReviewRating
    };
  }, [movies, reviews, watchlist]);

  if (loading || !analytics) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <div className="loading-spinner"></div>
        <p className="page-subheading" style={{ marginTop: 16 }}>
          Compiling Box Office & Catalogue Insights&hellip;
        </p>
      </div>
    );
  }

  return (
    <div className="insights-container">
      <div className="catalogue-header-section">
        <div>
          <h2 className="page-heading">Cinema Analytics & Box Office Insights</h2>
          <p className="page-subheading">
            Live metrics, genre distribution, critical scores, and audience engagement statistics.
          </p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={loadData}>
          &#8635; Refresh Metrics
        </button>
      </div>

      {/* Marquee Key Metric Cards */}
      <div className="insights-stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Titles in Archive</div>
          <div className="stat-value">{analytics.totalMovies}</div>
          <div className="stat-subtext">
            {analytics.customMoviesCount} user-submitted &bull; {analytics.totalMovies - analytics.customMoviesCount} seed titles
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Average Critic Score</div>
          <div className="stat-value" style={{ color: 'var(--gold)' }}>
            &#9733; {analytics.avgRating}
            <span style={{ fontSize: 16, color: 'var(--text-muted)' }}> / 10</span>
          </div>
          <div className="stat-subtext">Across all archive titles</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Average Film Runtime</div>
          <div className="stat-value">{analytics.avgRuntime} <span style={{ fontSize: 18, color: 'var(--text-muted)' }}>min</span></div>
          <div className="stat-subtext">~{Math.floor(analytics.avgRuntime / 60)}h {analytics.avgRuntime % 60}m per screening</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Audience Community Reviews</div>
          <div className="stat-value">{analytics.totalReviews}</div>
          <div className="stat-subtext">
            Average user rating: &#9733; {analytics.avgReviewRating}
          </div>
        </div>
      </div>

      <div className="insights-dual-layout">
        {/* Genre Breakdown Progress Meters */}
        <div className="insights-panel">
          <h3 className="panel-title">&#127917; Genre Breakdown & Distribution</h3>
          <p className="panel-subtitle">Titles catalogued by cinematic category and average score</p>

          <div className="genre-bars-list">
            {analytics.genreStats.map((item) => (
              <div key={item.genre} className="genre-bar-item">
                <div className="genre-bar-header">
                  <Link to={`/?genre=${encodeURIComponent(item.genre)}`} className="genre-bar-name">
                    {item.genre}
                  </Link>
                  <div className="genre-bar-meta">
                    <span className="genre-score">&#9733; {item.avgRating}</span>
                    <span className="genre-count">{item.count} film{item.count > 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="genre-progress-track">
                  <div
                    className="genre-progress-fill"
                    style={{ width: `${Math.max(12, item.percentage)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Box Office Leaderboard */}
        <div className="insights-panel">
          <h3 className="panel-title">&#127942; Top Rated Films Leaderboard</h3>
          <p className="panel-subtitle">Highest rated motion pictures in the CineFolio archive</p>

          <div className="leaderboard-list">
            {analytics.top5.map((film, index) => {
              const medalColor = index === 0 ? 'var(--gold)' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : 'var(--text-muted)';
              return (
                <Link to={`/movie/${film.id}`} key={film.id} className="leaderboard-item">
                  <div className="leaderboard-rank" style={{ color: medalColor }}>
                    #{index + 1}
                  </div>
                  <img
                    src={film.poster}
                    alt={film.title}
                    className="leaderboard-thumb"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/100x150/151922/E8B44D?font=montserrat&text=${encodeURIComponent(film.title)}`;
                    }}
                  />
                  <div className="leaderboard-info">
                    <div className="leaderboard-title">{film.title}</div>
                    <div className="leaderboard-details">
                      <span>{film.year}</span>
                      <span>&bull;</span>
                      <span>{film.runtime}m</span>
                      <span>&bull;</span>
                      <span>Dir. {film.director}</span>
                    </div>
                  </div>
                  <div className="leaderboard-rating">
                    &#9733; {film.rating}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Watchlist Engagement Metrics */}
      <div className="insights-panel" style={{ marginTop: 28 }}>
        <h3 className="panel-title">&#128278; Personal Watchlist Engagement Overview</h3>
        <p className="panel-subtitle">Current status distribution in your personal ticket queue</p>

        {analytics.watchlistTotal === 0 ? (
          <div className="empty-state" style={{ padding: '30px 20px' }}>
            <p>Your watchlist is currently empty. Bookmark films from the catalogue to see queue insights.</p>
            <Link to="/" className="btn btn-outline btn-sm" style={{ marginTop: 12 }}>
              Browse Catalogue
            </Link>
          </div>
        ) : (
          <div className="watchlist-stats-breakdown">
            <div className="wl-stat-pill">
              <span className="wl-stat-dot" style={{ background: '#3498db' }}></span>
              <span className="wl-stat-name">Plan to Watch</span>
              <strong className="wl-stat-num">{analytics.watchlistStatusCounts['Plan to Watch']}</strong>
            </div>
            <div className="wl-stat-pill">
              <span className="wl-stat-dot" style={{ background: 'var(--gold)' }}></span>
              <span className="wl-stat-name">Currently Watching</span>
              <strong className="wl-stat-num">{analytics.watchlistStatusCounts['Watching']}</strong>
            </div>
            <div className="wl-stat-pill">
              <span className="wl-stat-dot" style={{ background: '#2ecc71' }}></span>
              <span className="wl-stat-name">Completed</span>
              <strong className="wl-stat-num">{analytics.watchlistStatusCounts['Completed']}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
