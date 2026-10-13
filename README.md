# CineFolio — Movie Information Portal

Advanced Web Technologies Mini Project — **Phase I: Design, Planning & Core Implementation**

A React.js (ES6+) single-page application for browsing, searching, filtering, and tracking movies.

## Tech Stack
- React 18 (function components + Hooks)
- React Router v6 (client-side routing)
- Context API + `useReducer` (global watchlist state)
- Vite (build tool / dev server)
- Plain CSS with a design-token system (no external UI framework)

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/     Reusable UI pieces (Navbar, Hero, MovieCard, MovieGrid, FilterBar, Footer)
  pages/          Route-level screens (Home, MovieDetails, Watchlist, About, NotFound)
  context/        WatchlistContext — global state via Context + useReducer
  data/           Mock movie dataset (movies.js)
  services/       movieService.js — data-access layer (swap-ready for a live API)
  App.jsx         Route definitions
  main.jsx        App entry point
```

## Implemented Modules (Phase I)

1. **Home / Catalogue Browser** — hero banner for a featured title, genre filter chips, sort control, responsive movie grid.
2. **Search** — live search by title, director, or cast member from the navbar.
3. **Movie Details** — full detail view: synopsis, cast, genres, rating, runtime, director.
4. **Watchlist** — add/remove movies, persisted to `localStorage`, badge counter in the navbar.
5. **Routing** — `/`, `/movie/:id`, `/watchlist`, `/about`, and a 404 fallback, all via React Router.
6. **About** — project description page.

## Phase II Plan (not yet implemented)
- Replace the mock dataset in `src/services/movieService.js` with a live API (OMDb/TMDB), guarded behind an `.env` API key.
- Pagination / infinite scroll for large result sets.
- User authentication so watchlists sync across devices.
- Reviews and star-rating submission by users.

## Notes
Movie posters/backdrops in the mock dataset use placeholder images (`placehold.co`) — swap in real
artwork or live API images once a provider is connected.
