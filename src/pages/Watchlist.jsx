import React from 'react';
import { useWatchlist } from '../context/WatchlistContext.jsx';
import MovieGrid from '../components/MovieGrid.jsx';

export default function Watchlist() {
  const { watchlist, clearWatchlist } = useWatchlist();

  return (
    <>
      <h2 className="page-heading">Your Watchlist</h2>
      <p className="page-subheading">
        {watchlist.length > 0
          ? `${watchlist.length} movie${watchlist.length === 1 ? '' : 's'} saved for later.`
          : 'Movies you save will show up here.'}
      </p>

      {watchlist.length > 0 && (
        <button className="btn btn-outline" style={{ marginBottom: 20 }} onClick={clearWatchlist}>
          Clear Watchlist
        </button>
      )}

      <MovieGrid movies={watchlist} emptyMessage="Browse the catalogue and tap 'Add to Watchlist' on any movie." />
    </>
  );
}
