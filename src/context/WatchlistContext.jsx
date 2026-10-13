import React, { createContext, useContext, useEffect, useReducer } from 'react';

const WatchlistContext = createContext(null);
const STORAGE_KEY = 'cinefolio_watchlist_v2';

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
      return [
        {
          ...action.movie,
          status: 'Plan to Watch',
          personalNote: '',
          savedAt: new Date().toISOString()
        },
        ...state
      ];
    case 'REMOVE':
      return state.filter((m) => m.id !== action.id);
    case 'UPDATE_STATUS':
      return state.map((m) =>
        m.id === action.id ? { ...m, status: action.status } : m
      );
    case 'UPDATE_NOTE':
      return state.map((m) =>
        m.id === action.id ? { ...m, personalNote: action.note } : m
      );
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
  const updateWatchlistStatus = (id, status) => dispatch({ type: 'UPDATE_STATUS', id, status });
  const updateWatchlistNote = (id, note) => dispatch({ type: 'UPDATE_NOTE', id, note });
  const clearWatchlist = () => dispatch({ type: 'CLEAR' });
  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    updateWatchlistStatus,
    updateWatchlistNote,
    clearWatchlist,
    isInWatchlist
  };

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within a WatchlistProvider');
  return ctx;
}
