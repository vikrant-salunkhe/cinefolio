# CineFolio — Advanced Movie Information Portal
## Formative Assessment – II (FA-2) Presentation Slides (10 Slides)

**Department of MCA | Pimpri Chinchwad College of Engineering (PCCOE), Pune**  
**Course:** Advanced Web Technologies (SYMCA, Semester III)  
**Student:** Vikrant Salunkhe (PRN: 125M1H006)  
**Guide:** Prof. Dr. Avinash Chormale  
**GitHub:** [https://github.com/vikrant-salunkhe/cinefolio.git](https://github.com/vikrant-salunkhe/cinefolio.git)  

---

### Slide 1: Title & Project Metadata
- **Project Title:** CineFolio — Advanced Movie Information Portal
- **Phase:** Phase II (FA-2) — Advanced Features, Testing & Deployment
- **Student Name:** Vikrant Salunkhe (PRN: 125M1H006)
- **Class / Semester:** SYMCA, Semester III (2026–2027)
- **Course Guide:** Prof. Dr. Avinash Chormale
- **Institution:** Department of MCA, PCCOE Nigdi, Pune
> **Speaker Notes:** Introduce the project title, course context (Advanced Web Technologies), and objectives achieved across Phase I and Phase II.

---

### Slide 2: Problem Statement & Motivation
- **The Challenge:** Modern streaming and cinema aggregator platforms are cluttered, heavily monetized, and require unnecessary account signups just for quick title discovery.
- **The Solution:** CineFolio delivers a fast, cinema-themed web application enabling users to search, filter, review, submit titles, and curate personal watchlists offline or online.
- **Key Philosophy:** Clean component architecture, zero external UI framework dependencies, and cinema ticket-stub design aesthetics.
> **Speaker Notes:** Explain why lightweight, focused movie portals enhance user experience, and highlight our focus on vanilla CSS tokens and fast client-side performance.

---

### Slide 3: Evolution from FA-1 to FA-2
| Feature Area | Phase I (FA-1 Baseline) | Phase II (FA-2 Current Release) |
| :--- | :--- | :--- |
| **Data & Persistence** | In-memory mock list | LocalStorage persistence + Live API integration |
| **CRUD Capabilities** | Watchlist Add/Remove | Full CRUD for Movies, Reviews & Watchlist Notes |
| **Form Handling** | Basic unvalidated search bar | Fully validated forms with touched tracking & limits |
| **React Hooks** | Standard useState / useEffect | Custom hooks (`useDebounce`, `useLocalStorage`), useReducer |
| **Performance** | Single bundle load | Route-level code splitting (`React.lazy` + `Suspense`) |
| **Quality & Tests** | Manual verification | Automated test suite with 8 unit tests |
> **Speaker Notes:** Contrast the fundamental building blocks of Phase I with the advanced state, forms, CRUD, and testing of Phase II.

---

### Slide 4: System Architecture & Data Flow
- **Presentation Layer:** React 18 Functional Components, React Router v6.
- **State Management:**
  - `WatchlistContext`: Managed via `useReducer` with actions (`ADD`, `REMOVE`, `UPDATE_STATUS`, `UPDATE_NOTE`, `CLEAR`).
  - `ToastContext`: Global notification dispatcher with auto-dismiss timers.
- **Service Layer (`movieService.js`):**
  - Abstracts persistence (`localStorage` with memory fallback).
  - Integrates OMDb external API for live title lookup.
> **Speaker Notes:** Emphasize that UI components never interact with storage or APIs directly; they call the decoupled service layer.

---

### Slide 5: Advanced React Hooks & Custom Hooks
- **`useDebounce`:** Custom hook to debounce live search input (250ms), optimizing render cycles.
- **`useLocalStorage`:** Custom hook for bidirectional state-to-storage synchronization.
- **`useReducer`:** Predictable state transitions for watchlist items, notes, and statuses.
- **`useMemo`:** Memoizes computed paginated subsets (8 movies/page) to prevent redundant array slicing.
- **`useCallback`:** Guarantees stable function references for notification triggers.
> **Speaker Notes:** Walk through how `useDebounce` works internally using `setTimeout` and cleanup effects.

---

### Slide 6: Interactive Forms & Client-Side Validation
- **Add Movie Form (`SubmitMovie.jsx`):**
  - Real-time field validation for Title (&ge;2 chars), Year (1888–2030), Rating (1.0–10.0), Runtime, and Synopsis (&ge;15 chars).
  - Dirty & touched state tracking preventing premature error display.
  - Character counter for synopsis textarea.
- **Live API Autofill Engine:**
  - Users can enter a movie name, click "Autofill", and fetch real plot, release year, director, and poster from OMDb!
- **Review Submission Form (`ReviewSection.jsx`):**
  - Author name validation, star rating select, and feedback length check.
> **Speaker Notes:** Demonstrate live validation highlighting in red with descriptive helper text under each field.

---

### Slide 7: Full CRUD Implementation
- **Create (C):**
  - Add custom movie titles via validated form.
  - Submit audience reviews with star ratings.
- **Read (R):**
  - Browse catalogue with multi-filter and debounced search.
  - View movie details and compute live average audience scores.
- **Update (U):**
  - Change watchlist status (`Plan to Watch`, `Watching`, `Completed`).
  - Edit inline private notes for saved movies.
- **Delete (D):**
  - Delete titles from catalogue.
  - Delete audience reviews.
  - Remove items from watchlist or clear all.
> **Speaker Notes:** Detail the complete CRUD matrix implemented across movies, reviews, and watchlists.

---

### Slide 8: Resilience, Error Handling & Performance
- **React ErrorBoundary:**
  - Catches runtime rendering failures with cinema-themed fallback banner and reset navigation.
- **Toast Notifications:**
  - Floating status alerts for all CRUD user actions (Success, Error, Info).
- **Image Fallback:**
  - Automatic placeholder poster replacement if remote image fails to load.
- **Performance Optimization:**
  - Route code-splitting with `React.lazy()` and `<Suspense>`.
  - Initial bundle size reduced to lightweight chunks.
> **Speaker Notes:** Explain how Error Boundary prevents entire application crashes in production environments.

---

### Slide 9: Automated Testing & Verification
- **Test Runner:** Node.js native test runner (`node --test src/**/*.test.js`).
- **Test Suites Executed:**
  1. `useDebounce.test.js`: Validates timer debouncing and genre tag parsing.
  2. `movieService.test.js`: Validates all CRUD operations (Create, Read, Update, Delete) and sorting logic.
- **Test Results:**
  - 8/8 Tests Passed (100% pass rate).
  - Build verification: `vite build` generated clean production assets in 15 seconds.
> **Speaker Notes:** Highlight that automated testing ensures regressions are caught early, proving code reliability.

---

### Slide 10: Conclusion & Viva Preparation
- **Outcomes Achieved:**
  - Mastered advanced React patterns, custom hooks, and context state.
  - Built interactive forms with client-side validation.
  - Deployed resilient error handling and automated testing suites.
- **Sample Viva Questions Prepared:**
  1. *Q: Why use `useReducer` over multiple `useState` calls?*  
     A: When state transitions involve complex interdependent logic (like adding, removing, updating status, and editing notes on watchlist items), `useReducer` centralizes state transitions predictably.
  2. *Q: How does `useDebounce` optimize performance?*  
     A: It postpones filtering until the user finishes typing, eliminating redundant component re-renders on every keystroke.
  3. *Q: What does `React.lazy()` achieve?*  
     A: It enables dynamic imports so route components are loaded only when navigated to, minimizing the initial JavaScript payload.
- **Repository:** `https://github.com/vikrant-salunkhe/cinefolio.git`
> **Speaker Notes:** Conclude by thanking the guide and panel, and invite questions from the evaluators.
