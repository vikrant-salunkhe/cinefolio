# CineFolio — Advanced Movie Information Portal
## Formative Assessment – II (FA-2) Presentation Slides (10 Slides + Viva Guide)

**Department of MCA | Pimpri Chinchwad College of Engineering (PCCOE), Pune**  
**Course:** Advanced Web Technologies (SYMCA, Semester III)  
**Student:** Vikrant Salunkhe (PRN: 125M1H006)  
**Guide:** Prof. Dr. Avinash Chormale  
**GitHub:** [https://github.com/vikrant-salunkhe/cinefolio.git](https://github.com/vikrant-salunkhe/cinefolio.git)  

---

### Slide 1: Title & Project Metadata
- **Project Title:** CineFolio — Advanced Movie Information Portal
- **Phase:** Formative Assessment Complete — Advanced Features, Testing, Analytics & Deployment
- **Student Name:** Vikrant Salunkhe (PRN: 125M1H006)
- **Class / Semester:** SYMCA, Semester III (2026–2027)
- **Course Guide:** Prof. Dr. Avinash Chormale
- **Institution:** Department of MCA, PCCOE Nigdi, Pune
> **Speaker Notes:** Introduce the project title, course context (Advanced Web Technologies), and objectives achieved across Phase I and Phase II.

---

### Slide 2: Problem Statement & Motivation
- **The Challenge:** Modern streaming and cinema aggregator platforms are cluttered, heavily monetized, and require unnecessary account signups just for quick title discovery.
- **The Solution:** CineFolio delivers a fast, cinema-themed web application enabling users to search, filter, review, edit, analyze, and curate personal watchlists offline or online.
- **Key Philosophy:** Clean component architecture, zero external UI framework dependencies, and cinema marquee design aesthetics.
> **Speaker Notes:** Explain why lightweight, focused movie portals enhance user experience, and highlight our focus on vanilla CSS tokens and fast client-side performance.

---

### Slide 3: Evolution from FA-1 to FA-2
| Feature Area | Phase I (FA-1 Baseline) | Phase II (FA-2 Complete Release) |
| :--- | :--- | :--- |
| **Data & Persistence** | In-memory mock list | LocalStorage persistence + Live API + Portable JSON Backup |
| **CRUD Capabilities** | Watchlist Add/Remove | Full CRUD for Movies (Create, Read, Update via Modal, Delete) + Reviews |
| **Form Handling** | Basic unvalidated search bar | Fully validated forms with touched tracking, regex limits & API autofill |
| **Analytics & Metrics** | None | Live Box Office Insights dashboard with genre distribution meters |
| **React Hooks** | Standard useState / useEffect | Custom hooks (`useDebounce`, `useLocalStorage`), useReducer, useMemo |
| **Performance** | Single bundle load | Route-level code splitting (`React.lazy` + `Suspense`) |
| **Quality & Tests** | Manual verification | Automated test suite with 12 comprehensive unit tests |
> **Speaker Notes:** Contrast the fundamental building blocks of Phase I with the advanced state, forms, full CRUD, analytics, and testing of the completed release.

---

### Slide 4: System Architecture & Data Flow
- **Presentation Layer:** React 18 Functional Components, React Router v6 with query parameter sync (`/?q=...&genre=...`).
- **State Management:**
  - `WatchlistContext`: Managed via `useReducer` with actions (`ADD`, `REMOVE`, `UPDATE_STATUS`, `UPDATE_NOTE`, `CLEAR`).
  - `ToastContext`: Global notification dispatcher with auto-dismiss timers.
- **Service Layer (`movieService.js`):**
  - Abstracts persistence (`localStorage` with memory fallback).
  - Integrates OMDb external API for live title lookup.
  - Implements backup serialization/deserialization for JSON data archival.
> **Speaker Notes:** Emphasize that UI components never interact with storage or APIs directly; they call the decoupled service layer.

---

### Slide 5: Advanced React Hooks & Custom Hooks
- **`useDebounce`:** Custom hook to debounce live search input (250ms), optimizing render cycles.
- **`useLocalStorage`:** Custom hook for bidirectional state-to-storage synchronization.
- **`useReducer`:** Predictable state transitions for watchlist items, notes, and statuses.
- **`useMemo`:** Memoizes computed paginated subsets (8 movies/page) and aggregate box office analytics.
- **`useCallback`:** Guarantees stable function references for notification triggers.
> **Speaker Notes:** Walk through how `useDebounce` works internally using `setTimeout` and cleanup effects.

---

### Slide 6: Interactive Forms & Client-Side Validation
- **Add Movie Form (`SubmitMovie.jsx`) & Edit Movie Modal (`EditMovieModal.jsx`):**
  - Real-time field validation for Title (&ge;2 chars), Year (1888–2030), Rating (1.0–10.0), Runtime, and Synopsis (&ge;15 chars).
  - Dirty & touched state tracking preventing premature error display.
  - Character counter for synopsis textarea.
- **Live API Autofill Engine:**
  - Users can enter a movie name, click "Autofill", and fetch real plot, release year, director, and poster from OMDb!
- **Review Submission Form (`ReviewSection.jsx`):**
  - Author name validation, star rating select, and feedback length check with auto-calculated community rating average.
> **Speaker Notes:** Demonstrate live validation highlighting in red with descriptive helper text under each field.

---

### Slide 7: Full CRUD Implementation & Data Archival
- **Create (C):** Add custom movie titles via validated form; submit audience reviews with star ratings.
- **Read (R):** Browse catalogue with multi-filter and debounced search; view movie details and live metrics.
- **Update (U):** Full movie edit modal (`EditMovieModal.jsx`) modifying movie attributes; change watchlist status and inline notes.
- **Delete (D):** Delete titles from catalogue; delete audience reviews; remove watchlist items.
- **Data Management:** Portable JSON backup export, archival import with schema validation, and seed data reset.
> **Speaker Notes:** Detail the complete CRUD matrix implemented across movies, reviews, and watchlists.

---

### Slide 8: Box Office Analytics & Cinema Insights
- **Dashboard Overview (`/insights`):**
  - Key metric cards: total library titles, user submissions, average rating, screening runtime.
  - Interactive genre distribution progress tracks with average score per genre.
  - Top 5 Highest Rated Films Leaderboard with medal rank badges.
  - Personal watchlist engagement status distributions.
- **Social Sharing:** One-click clipboard copy for movie links with toast confirmation.
> **Speaker Notes:** Explain how the analytics dashboard aggregates state from local storage using `useMemo` for high performance.

---

### Slide 9: Automated Testing & Verification
- **Test Runner:** Node.js native test runner (`node --test src/**/*.test.js`).
- **Test Suites Executed:**
  1. `useDebounce.test.js`: Validates timer debouncing and genre tag parsing.
  2. `movieService.test.js`: Validates all CRUD operations (Create, Read, Update, Delete), sorting logic, reviews aggregation, and JSON backup/restore.
- **Test Results:**
  - 12/12 Tests Passed (100% pass rate).
  - Production build: `vite build` generated clean on-demand chunks in under 2.5 seconds.
> **Speaker Notes:** Highlight that automated testing ensures regressions are caught early, proving code reliability.

---

### Slide 10: Conclusion & Viva Preparation
- **Outcomes Achieved:**
  - Mastered advanced React patterns, custom hooks, and context state.
  - Built interactive forms with real-time client-side validation.
  - Deployed resilient error handling, box office analytics, and automated testing suites.
- **Sample Viva Questions Prepared:**
  1. *Q: Why use `useReducer` over multiple `useState` calls?*  
     A: When state transitions involve complex interdependent logic (like adding, removing, updating status, and editing notes on watchlist items), `useReducer` centralizes state transitions predictably.
  2. *Q: How does `useDebounce` optimize performance?*  
     A: It postpones filtering until the user finishes typing, eliminating redundant component re-renders on every keystroke.
  3. *Q: What does `React.lazy()` achieve?*  
     A: It enables dynamic imports so route components are loaded only when navigated to, minimizing the initial JavaScript payload.
  4. *Q: How are CRUD operations persisted?*  
     A: Through an abstracted service layer (`movieService.js`) synchronizing with `localStorage` and supporting portable JSON backups.
- **Repository:** `https://github.com/vikrant-salunkhe/cinefolio.git`
> **Speaker Notes:** Conclude by thanking the guide and panel, and invite questions from the evaluators.
