import { useEffect, useMemo, useState } from "react";
import MovieList from "./components/MovieList";
import Filter from "./components/Filter";
import "./App.css";

const starterMovies = [
  {
    id: "m1",
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    posterURL:
      "https://images.fandango.com/ImageRenderer/500/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/234877/DUNE2_VERT_MAIN_2764x4096_DOM_REV.jpg",
    rating: 4.8,
    year: 2024,
    genre: "SCI-FI · ADVENTURE",
  },
  {
    id: "m2",
    title: "The Grand Budapest Hotel",
    description:
      "A legendary concierge and his loyal protégé become wrapped up in a priceless painting and a family fortune.",
    posterURL:
      "https://cdn.shopify.com/s/files/1/1416/8662/products/1_aba3b3f6-35c4-4f40-ac16-feb6bf4aac28_spo_2000x.jpg?v=1562540105",
    rating: 4.6,
    year: 2014,
    genre: "COMEDY · DRAMA",
  },
  {
    id: "m3",
    title: "Interstellar",
    description:
      "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",
    posterURL:
      "https://i.imgur.com/KuN7a6b.jpg",
    rating: 4.9,
    year: 2014,
    genre: "SCI-FI · DRAMA",
  },
  {
    id: "m4",
    title: "Past Lives",
    description:
      "Two deeply connected childhood friends are wrested apart after one family emigrates from South Korea.",
    posterURL:
      "https://dx35vtwkllhj9.cloudfront.net/a24films/past-lives/images/regions/us/onesheet.jpg",
    rating: 4.4,
    year: 2023,
    genre: "ROMANCE · DRAMA",
  },
  {
    id: "m5",
    title: "Spider-Man: Across the Spider-Verse",
    description:
      "Miles Morales catapults across the Multiverse and encounters a team charged with protecting its existence.",
    posterURL:
      "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/12/4f2bbd93067e55a4244789c53f576d12_original.jpg?t=1683882975",
    rating: 4.7,
    year: 2023,
    genre: "ANIMATION · ACTION",
  },
  {
    id: "m6",
    title: "The Lighthouse",
    description:
      "Two lighthouse keepers try to maintain their sanity while living on a remote and mysterious New England island.",
    posterURL:
      "https://www.universalpictures.co.uk/tl_files/content/movies/lighthouse/posters/01.jpg",
    rating: 4.2,
    year: 2019,
    genre: "THRILLER · DRAMA",
  },
];

function readMovies() {
  try {
    const saved = localStorage.getItem("reelgood-movies");
    if (!saved) return starterMovies
    const savedMovies = JSON.parse(saved)
    return savedMovies.map((movie) => {
      const updatedPoster = starterMovies.find((starter) => starter.id === movie.id)?.posterURL
      return updatedPoster ? { ...movie, posterURL: updatedPoster } : movie
    });
  } catch {
    return starterMovies;
  }
}

function App() {
  const [movies, setMovies] = useState(readMovies);
  const [titleFilter, setTitleFilter] = useState("");
  const [minRating, setMinRating] = useState("all");
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: "4.0",
  });

  useEffect(() => {
    localStorage.setItem("reelgood-movies", JSON.stringify(movies));
  }, [movies]);

  const visibleMovies = useMemo(
    () =>
      movies.filter((movie) => {
        const matchesTitle = movie.title
          .toLowerCase()
          .includes(titleFilter.trim().toLowerCase());
        const matchesRating =
          minRating === "all" || movie.rating >= Number(minRating);
        return matchesTitle && matchesRating;
      }),
    [movies, titleFilter, minRating],
  );

  const addMovie = (event) => {
    event.preventDefault();
    const newMovie = {
      ...form,
      id: crypto.randomUUID(),
      rating: Number(form.rating),
      year: new Date().getFullYear(),
      genre: "YOUR COLLECTION",
      posterURL:
        form.posterURL.trim() ||
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85",
    };
    setMovies((current) => [newMovie, ...current]);
    setForm({ title: "", description: "", posterURL: "", rating: "4.0" });
    setIsAdding(false);
  };

  const average = movies.length
    ? (
        movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length
      ).toFixed(1)
    : "—";

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Reelgood home">
          <span className="brand-mark">
            r<span>.</span>
          </span>
          <span>reelgood</span>
        </a>
        <nav className="topnav" aria-label="Main navigation">
          <a className="active" href="#collection">
            Discover
          </a>
          <a href="#collection">My collection</a>
        </nav>
        <button
          className="profile-button"
          type="button"
          aria-label="Your profile"
        >
          A
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> YOUR PERSONAL SCREENING ROOM
            </div>
            <h1>
              Stories worth
              <br />
              <em>staying in for.</em>
            </h1>
            <p>
              A little corner of the internet for the films and shows you love.
            </p>
            <a className="hero-link" href="#collection">
              Explore your collection <span>↘</span>
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-glow" />
            <div className="film-frame frame-back">
              <div className="frame-image frame-image-back" />
            </div>
            <div className="film-frame frame-front">
              <div className="frame-image frame-image-front" />
              <span className="frame-caption">
                THE ART OF
                <br />
                GETTING LOST
              </span>
            </div>
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <span className="hero-spark">✳</span>
            <span className="hero-stamp">
              ISSUE
              <br />
              <b>№ 06</b>
            </span>
          </div>
          <div className="hero-index">
            <span>01</span>
            <span className="index-rule" />
            <span>06</span>
          </div>
        </section>

        <section id="collection" className="collection-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow dark-eyebrow">
                <span className="eyebrow-line" /> THE GOOD STUFF
              </div>
              <h2>
                Your collection<span className="heading-period">.</span>
              </h2>
            </div>
            <div className="collection-note">
              A running list of things
              <br />
              you loved watching.
            </div>
          </div>

          <div className="collection-toolbar">
            <div className="collection-count">
              <strong>{String(movies.length).padStart(2, "0")}</strong>
              <span>FILMS & SHOWS</span>
            </div>
            <Filter
              title={titleFilter}
              rate={minRating}
              onTitleChange={setTitleFilter}
              onRateChange={setMinRating}
            />
            <button
              className="add-button"
              type="button"
              onClick={() => setIsAdding(true)}
            >
              <span>＋</span> Add a title
            </button>
          </div>

          <MovieList movies={visibleMovies} />
          {movies.length > 0 && (
            <div className="collection-footer">
              <span>
                YOUR AVERAGE RATING <b>★ {average}</b>
              </span>
              <span>MADE FOR THE LOVE OF FILM&nbsp; ↗</span>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">
            r<span>.</span>
          </span>
          <span>reelgood</span>
        </a>
        <span>KEEP THE CREDITS ROLLING.</span>
        <span>© 2025 REELGOOD CLUB</span>
      </footer>

      {isAdding && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsAdding(false);
          }}
        >
          <section
            className="add-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setIsAdding(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="eyebrow dark-eyebrow">
              <span className="eyebrow-line" /> ADD TO YOUR LIST
            </div>
            <h2 id="modal-title">
              One for the <em>books.</em>
            </h2>
            <p className="modal-intro">
              Keep the good ones close. Add a film or show to your collection.
            </p>
            <form onSubmit={addMovie} className="movie-form">
              <label>
                Title
                <input
                  required
                  autoFocus
                  maxLength="80"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. In the Mood for Love"
                />
              </label>
              <label>
                Description
                <textarea
                  required
                  maxLength="260"
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="What makes it worth watching?"
                />
              </label>
              <label>
                Poster image URL{" "}
                <span className="optional-label">OPTIONAL</span>
                <input
                  type="url"
                  value={form.posterURL}
                  onChange={(e) =>
                    setForm({ ...form, posterURL: e.target.value })
                  }
                  placeholder="https://…"
                />
              </label>
              <label>
                Your rating{" "}
                <span className="rating-input">
                  <span>★</span>
                  <select
                    value={form.rating}
                    onChange={(e) =>
                      setForm({ ...form, rating: e.target.value })
                    }
                  >
                    {[
                      "5.0",
                      "4.5",
                      "4.0",
                      "3.5",
                      "3.0",
                      "2.5",
                      "2.0",
                      "1.5",
                      "1.0",
                    ].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} / 5
                      </option>
                    ))}
                  </select>
                </span>
              </label>
              <button className="submit-button" type="submit">
                Add to collection <span>↗</span>
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;

