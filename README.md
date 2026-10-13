# CineFolio — Advanced Movie Information Portal

**Advanced Web Technologies — Mini Project (Phase I & Phase II Complete)**  
*Department of MCA, Pimpri Chinchwad College of Engineering (PCCOE), Pune*  
**Student:** Vikrant Salunkhe (PRN: 125M1H006) | **Guide:** Prof. Dr. Avinash Chormale  

A fast, cinema-themed React 18 single-page application for browsing, searching, filtering, reviewing, and tracking movies with persistent storage, full CRUD operations, and live API support.

---

## Tech Stack
- **Core:** React 18 (Function Components, Custom Hooks)
- **Routing:** React Router v6 (Nested routes, dynamic parameters, code splitting via `React.lazy` + `<Suspense>`)
- **State Management:** React Context API + `useReducer` (Global Watchlist & Toast Notifications)
- **Build Tool:** Vite 5
- **Testing:** Node.js native test runner (`node --test`)
- **Styling:** Vanilla CSS with custom cinema marquee design tokens (No heavy UI frameworks)

---

## Key Features Implemented (Phase II / FA-2)

1. **Full CRUD Operations:**
   - **Create:** Add new custom movies via validated form; submit audience reviews with star ratings.
   - **Read:** Catalogue browsing, live search, movie details, and audience feedback.
   - **Update:** Manage Watchlist status (`Plan to Watch`, `Watching`, `Completed`) and edit personal notes.
   - **Delete:** Remove movies from catalogue, delete individual reviews, and manage watchlist items.
2. **Interactive Forms & Real-time Validation:**
   - Real-time constraint checking (Title, Year, Rating, Runtime, Synopsis minimum characters).
   - Touched state tracking with contextual error messages.
   - Quick Autofill via live external API (OMDb) for automatic metadata fetching.
3. **Advanced & Custom React Hooks:**
   - `useDebounce`: Debounces live search input (250ms) to eliminate redundant re-renders.
   - `useLocalStorage`: State-to-storage synchronization.
   - `useMemo`: Memoizes paginated movie subsets (8 titles per page).
   - `useReducer`: Predictable state transitions for watchlist items and notes.
4. **Resilience & Error Handling:**
   - React `ErrorBoundary` lifecycle catching rendering errors with graceful cinema recovery UI.
   - Global Toast Notification system with auto-dismiss timers.
   - Image fallback handlers for missing/broken poster URLs.
5. **Automated Testing Suite:**
   - 8 comprehensive unit tests covering CRUD services, filter/sort logic, and custom hook debounce timers.

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

- **FA-2 Project Report (8–10 pages equivalent):** [`docs/FA2_PROJECT_REPORT.md`](docs/FA2_PROJECT_REPORT.md)
- **FA-2 Presentation Slides (10 slides + Viva Q&A):** [`docs/FA2_PRESENTATION_SLIDES.md`](docs/FA2_PRESENTATION_SLIDES.md)
- **GitHub Repository:** [https://github.com/vikrant-salunkhe/cinefolio.git](https://github.com/vikrant-salunkhe/cinefolio.git)
