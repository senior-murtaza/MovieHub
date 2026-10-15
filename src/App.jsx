import { useState } from "react";
import movies from "./movies";
import MovieCard from "./MovieCard";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const genres = [
    "All",
    ...new Set(movies.map((movie) => movie.genre))
  ];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "All" || movie.genre === genre;

    const matchesFavorites =
      !showFavorites || favorites.includes(movie.id);

    return matchesSearch && matchesGenre && matchesFavorites;
  });

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((movieId) => movieId !== id)
        : [...previous, id]
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <a href="#" className="logo">
          <span>🎬</span> MovieBox
        </a>

        <nav>
          <button
            className={!showFavorites ? "nav-active" : ""}
            onClick={() => setShowFavorites(false)}
          >
            Discover
          </button>

          <button
            className={showFavorites ? "nav-active" : ""}
            onClick={() => setShowFavorites(true)}
          >
            Favorites ({favorites.length})
          </button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <span className="eyebrow">YOUR MOVIE DESTINATION</span>

          <h1>
            Discover your next
            <br />
            <span>favorite movie.</span>
          </h1>

          <p>
            Explore great stories, find hidden gems,
            and build your personal movie collection.
          </p>

          <a href="#movie-library" className="hero-btn">
            Explore Movies →
          </a>
        </section>

        <section className="library" id="movie-library">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MOVIE COLLECTION</span>
              <h2>
                {showFavorites ? "Your Favorites" : "Explore Movies"}
              </h2>
            </div>

            <span className="movie-count">
              {filteredMovies.length} movies
            </span>
          </div>

          <div className="filters">
            <input
              type="search"
              placeholder="Search movies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            >
              {genres.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Genres" : item}
                </option>
              ))}
            </select>
          </div>

          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <div className="movie-wrapper" key={movie.id}>
                <MovieCard
                  movie={movie}
                  onSelect={setSelectedMovie}
                />

                <button
                  className={`favorite-btn ${
                    favorites.includes(movie.id) ? "is-favorite" : ""
                  }`}
                  onClick={() => toggleFavorite(movie.id)}
                  aria-label={`${
                    favorites.includes(movie.id)
                      ? "Remove"
                      : "Add"
                  } ${movie.title} ${
                    favorites.includes(movie.id) ? "from" : "to"
                  } favorites`}
                >
                  {favorites.includes(movie.id) ? "♥" : "♡"}
                </button>
              </div>
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <div className="empty-state">
              <span>🍿</span>
              <h3>No movies found</h3>
              <p>Try another title, genre, or favorites filter.</p>
            </div>
          )}
        </section>
      </main>

      <footer>
        <a href="#" className="logo">🎬 MovieBox</a>
        <p>Made for movie lovers. © 2026 MovieBox</p>
      </footer>

      {selectedMovie && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="movie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedMovie(null)}
              aria-label="Close details"
            >
              ×
            </button>

            <div
              className="modal-poster"
              style={{ background: selectedMovie.color }}
            >
              {selectedMovie.title}
            </div>

            <span className="eyebrow">MOVIE DETAILS</span>
            <h2 id="modal-title">{selectedMovie.title}</h2>

            <p className="movie-meta">
              {selectedMovie.year} · {selectedMovie.genre} · ⭐{" "}
              {selectedMovie.rating}
            </p>

            <p>{selectedMovie.description}</p>

            <button
              className="details-btn"
              onClick={() => toggleFavorite(selectedMovie.id)}
            >
              {favorites.includes(selectedMovie.id)
                ? "♥ Remove from Favorites"
                : "♡ Add to Favorites"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}