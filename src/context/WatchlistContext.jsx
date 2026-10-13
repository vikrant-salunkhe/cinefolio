import React, { createContext, useContext, useEffect, useReducer } from 'react';

const WatchlistContext = createContext(null);
const STORAGE_KEY = 'cinefolio_watchlist_v1';

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Could not read watchlist from storage', err);
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      if (state.some((m) => m.id === action.movie.id)) return state;
      return [...state, action.movie];
    case 'REMOVE':
      return state.filter((m) => m.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function WatchlistProvider({ children }) {
  const [watchlist, dispatch] = useReducer(reducer, [], loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => dispatch({ type: 'ADD', movie });
  const removeFromWatchlist = (id) => dispatch({ type: 'REMOVE', id });
  const clearWatchlist = () => dispatch({ type: 'CLEAR' });
  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  const value = { watchlist, addToWatchlist, removeFromWatchlist, clearWatchlist, isInWatchlist };

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within a WatchlistProvider');
  return ctx;
}
