// Mock movie dataset for Phase I (core implementation).
// In Phase II this can be swapped for a live API response (see src/services/movieService.js).

const movies = [
  {
    id: 1,
    title: "Nebula Drift",
    year: 2024,
    genres: ["Sci-Fi", "Adventure"],
    rating: 8.4,
    runtime: 138,
    director: "Ava Marsh",
    cast: ["Ren Okafor", "Lucia Bianchi", "Tomas Weir"],
    poster: "https://placehold.co/400x600/151922/E8B44D?font=montserrat&text=Nebula%0ADrift",
    backdrop: "https://placehold.co/1200x500/0B0E14/E8B44D?font=montserrat&text=NEBULA+DRIFT",
    synopsis:
      "A salvage crew drifting on the edge of known space intercepts a signal that shouldn't exist, forcing them to choose between profit and survival.",
    featured: true
  },
  {
    id: 2,
    title: "Paper Lanterns",
    year: 2023,
    genres: ["Drama", "Romance"],
    rating: 7.8,
    runtime: 112,
    director: "Hiro Tanaka",
    cast: ["Mei Sato", "Daniel Cho"],
    poster: "https://placehold.co/400x600/151922/C0392B?font=montserrat&text=Paper%0ALanterns",
    backdrop: "https://placehold.co/1200x500/0B0E14/C0392B?font=montserrat&text=PAPER+LANTERNS",
    synopsis:
      "Two estranged childhood friends reunite during a lantern festival and must decide whether to let go of the past or rewrite it.",
    featured: false
  },
  {
    id: 3,
    title: "Iron Meridian",
    year: 2022,
    genres: ["Action", "Thriller"],
    rating: 7.2,
    runtime: 121,
    director: "Marcus Vale",
    cast: ["Grace Odom", "Iker Salas", "Priya Nair"],
    poster: "https://placehold.co/400x600/151922/8B92A3?font=montserrat&text=Iron%0AMeridian",
    backdrop: "https://placehold.co/1200x500/0B0E14/8B92A3?font=montserrat&text=IRON+MERIDIAN",
    synopsis:
      "An ex-intelligence officer is pulled back into the field when a weapons convoy she once protected resurfaces in the wrong hands.",
    featured: false
  },
  {
    id: 4,
    title: "The Quiet Orchard",
    year: 2021,
    genres: ["Drama"],
    rating: 8.9,
    runtime: 104,
    director: "Eleanor Finch",
    cast: ["Margot Weiss", "Samuel Adeyemi"],
    poster: "https://placehold.co/400x600/151922/E8B44D?font=montserrat&text=The+Quiet%0AOrchard",
    backdrop: "https://placehold.co/1200x500/0B0E14/E8B44D?font=montserrat&text=THE+QUIET+ORCHARD",
    synopsis:
      "A retired botanist returns to her family orchard and slowly uncovers the reasons her father abandoned it thirty years earlier.",
    featured: false
  },
  {
    id: 5,
    title: "Static & Sirens",
    year: 2024,
    genres: ["Horror", "Thriller"],
    rating: 6.9,
    runtime: 97,
    director: "Cole Bennett",
    cast: ["Nadia Kerr", "Owen Prasad"],
    poster: "https://placehold.co/400x600/151922/C0392B?font=montserrat&text=Static+%26%0ASirens",
    backdrop: "https://placehold.co/1200x500/0B0E14/C0392B?font=montserrat&text=STATIC+%26+SIRENS",
    synopsis:
      "A late-night radio host starts receiving calls from listeners who describe events before they happen.",
    featured: false
  },
  {
    id: 6,
    title: "Second Innings",
    year: 2023,
    genres: ["Comedy", "Drama"],
    rating: 7.5,
    runtime: 118,
    director: "Reema Kapoor",
    cast: ["Arjun Malhotra", "Farah Khosla", "Neel Bhatt"],
    poster: "https://placehold.co/400x600/151922/8B92A3?font=montserrat&text=Second%0AInnings",
    backdrop: "https://placehold.co/1200x500/0B0E14/8B92A3?font=montserrat&text=SECOND+INNINGS",
    synopsis:
      "A washed-up cricket coach is handed a losing school team and one season to prove he still has something left to give.",
    featured: false
  },
  {
    id: 7,
    title: "Glass Migration",
    year: 2020,
    genres: ["Sci-Fi", "Drama"],
    rating: 8.1,
    runtime: 129,
    director: "Ava Marsh",
    cast: ["Tomas Weir", "Ingrid Solberg"],
    poster: "https://placehold.co/400x600/151922/E8B44D?font=montserrat&text=Glass%0AMigration",
    backdrop: "https://placehold.co/1200x500/0B0E14/E8B44D?font=montserrat&text=GLASS+MIGRATION",
    synopsis:
      "As Earth's climate collapses, a small colony ship's AI must decide which passengers wake up on the other side of the journey.",
    featured: false
  },
  {
    id: 8,
    title: "Midnight Ledger",
    year: 2022,
    genres: ["Crime", "Mystery"],
    rating: 7.6,
    runtime: 110,
    director: "Victor Anand",
    cast: ["Priya Nair", "Elliot Marsh"],
    poster: "https://placehold.co/400x600/151922/C0392B?font=montserrat&text=Midnight%0ALedger",
    backdrop: "https://placehold.co/1200x500/0B0E14/C0392B?font=montserrat&text=MIDNIGHT+LEDGER",
    synopsis:
      "A forensic accountant uncovers a decades-old fraud that links her own late mentor to a string of unsolved disappearances.",
    featured: false
  },
  {
    id: 9,
    title: "Corner Booth",
    year: 2019,
    genres: ["Comedy"],
    rating: 6.7,
    runtime: 89,
    director: "Reema Kapoor",
    cast: ["Farah Khosla", "Owen Prasad", "Mei Sato"],
    poster: "https://placehold.co/400x600/151922/8B92A3?font=montserrat&text=Corner%0ABooth",
    backdrop: "https://placehold.co/1200x500/0B0E14/8B92A3?font=montserrat&text=CORNER+BOOTH",
    synopsis:
      "Four college roommates reunite once a year at the same diner booth - this year, one of them brings news that changes everything.",
    featured: false
  },
  {
    id: 10,
    title: "The Cartographer's Wife",
    year: 2021,
    genres: ["Drama", "Romance", "History"],
    rating: 8.3,
    runtime: 141,
    director: "Eleanor Finch",
    cast: ["Ingrid Solberg", "Samuel Adeyemi"],
    poster: "https://placehold.co/400x600/151922/E8B44D?font=montserrat&text=Cartographer%27s%0AWife",
    backdrop: "https://placehold.co/1200x500/0B0E14/E8B44D?font=montserrat&text=THE+CARTOGRAPHER%27S+WIFE",
    synopsis:
      "In 1930s colonial India, a mapmaker's wife begins secretly redrawing borders in ways that will outlast the empire that drew them.",
    featured: false
  },
  {
    id: 11,
    title: "Overclocked",
    year: 2024,
    genres: ["Action", "Sci-Fi"],
    rating: 7.0,
    runtime: 103,
    director: "Marcus Vale",
    cast: ["Grace Odom", "Daniel Cho", "Nadia Kerr"],
    poster: "https://placehold.co/400x600/151922/C0392B?font=montserrat&text=Overclocked",
    backdrop: "https://placehold.co/1200x500/0B0E14/C0392B?font=montserrat&text=OVERCLOCKED",
    synopsis:
      "A rogue engineer has ninety minutes to shut down the trading algorithm she built before it liquidates half the city's pension funds.",
    featured: false
  },
  {
    id: 12,
    title: "Field Notes",
    year: 2020,
    genres: ["Documentary", "Adventure"],
    rating: 8.7,
    runtime: 95,
    director: "Hiro Tanaka",
    cast: ["Narrated by Iker Salas"],
    poster: "https://placehold.co/400x600/151922/8B92A3?font=montserrat&text=Field%0ANotes",
    backdrop: "https://placehold.co/1200x500/0B0E14/8B92A3?font=montserrat&text=FIELD+NOTES",
    synopsis:
      "A three-year expedition following the last free-roaming herds of the Central Asian steppe, told through the diaries of the field team.",
    featured: false
  }
];

export default movies;

export const genreList = [
  "All",
  ...Array.from(new Set(movies.flatMap((m) => m.genres))).sort()
];
