# CineFolio — Advanced Movie Information Portal

**Advanced Web Technologies — Mini Project (Formative Assessment Complete)**  
*Department of MCA, Pimpri Chinchwad College of Engineering (PCCOE), Pune*  
**Student:** Vikrant Salunkhe (PRN: 125M1H006) | **Guide:** Prof. Dr. Avinash Chormale  

A fast, cinema-themed React 18 single-page application for browsing, searching, filtering, reviewing, editing, and tracking movies with persistent storage, full CRUD operations, live API support, box office analytics, and portable data archival.

---

## Tech Stack
- **Core:** React 18 (Function Components, Custom Hooks)
- **Routing:** React Router v6 (Nested routes, dynamic parameters, query string sync, code splitting via `React.lazy` + `<Suspense>`)
- **State Management:** React Context API + `useReducer` (Global Watchlist & Toast Notifications)
- **Build Tool:** Vite 5
- **Testing:** Node.js native test runner (`node --test`) — 12 Automated Unit Tests (100% Pass)
- **Styling:** Vanilla CSS with custom cinema marquee design tokens (Zero external UI library bloat)

---

## Key Modules & Features Implemented

1. **Full CRUD Operations Matrix:**
   - **Create:** Add new custom movies via validated form; submit audience reviews with 1–10 star ratings.
   - **Read:** Catalogue browsing with debounced search, genre tags, movie details, audience feedback, and box office metrics.
   - **Update:** Full interactive Movie Edit Modal (`EditMovieModal.jsx`) with live field validation; manage Watchlist status (`Plan to Watch`, `Watching`, `Completed`) and edit personal notes.
   - **Delete:** Remove movies from catalogue, delete individual reviews, and remove titles or clear entire watchlist.
2. **Interactive Forms & Real-time Validation:**
   - Real-time constraint checking (Title, Year, Rating, Runtime, Synopsis minimum characters).
   - Touched/dirty state tracking with contextual error messages and character counter.
   - Quick Autofill via live external API (OMDb) for automatic metadata fetching.
3. **Box Office Analytics & Cinema Insights Dashboard (`/insights`):**
   - Live metrics calculation with `useMemo`: total archive titles, community submissions, average rating, screening runtimes.
   - Cinematic genre distribution meters with progress tracks and average scores.
   - Top 5 Highest Rated Films Leaderboard with medal rank badges.
   - Personal watchlist queue breakdown and audience engagement statistics.
4. **Data Management & Portable Archival Portal (`/about`):**
   - **Export Data Backup:** Download the entire movies catalogue and reviews database as a JSON backup file.
   - **Import Backup File:** Restore or merge catalogue data from any valid backup JSON file with automated validation.
   - **Reset to Seed Defaults:** Instant one-click restoration to default titles and reviews.
5. **Interactive Navigation & Sharing:**
   - Clickable genre tags across catalogue and movie details that immediately filter search results.
   - One-click "Share Movie" clipboard copy with instant toast alerts.
   - URL query parameter synchronization (`/?q=...&genre=...`).
6. **Advanced & Custom React Hooks:**
   - `useDebounce`: Debounces live search input (250ms) to eliminate redundant re-renders.
   - `useLocalStorage`: State-to-storage synchronization.
   - `useMemo`: Memoizes paginated movie subsets (8 titles per page) and analytics calculations.
   - `useReducer`: Predictable state transitions for watchlist items and notes.
7. **Resilience & Error Handling:**
   - React `ErrorBoundary` lifecycle catching rendering errors with graceful cinema recovery UI.
   - Global Toast Notification system with auto-dismiss timers.
   - Image fallback handlers for missing/broken poster URLs.
8. **Automated Testing Suite:**
   - 12 comprehensive unit tests covering CRUD services (Create, Read, Update, Delete), filter/sort logic, debounce timers, review workflows, and data backup/restore.

---

## Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Run Automated Tests
```bash
npm test
```

### Production Build
```bash
npm run build
npm run preview
```

---

## Documentation & Deliverables

- **Project Report (8–10 pages equivalent):** [`docs/FA2_PROJECT_REPORT.md`](docs/FA2_PROJECT_REPORT.md)
- **Presentation Slides (10 slides + Viva Q&A):** [`docs/FA2_PRESENTATION_SLIDES.md`](docs/FA2_PRESENTATION_SLIDES.md)
- **GitHub Repository:** [https://github.com/vikrant-salunkhe/cinefolio.git](https://github.com/vikrant-salunkhe/cinefolio.git)
