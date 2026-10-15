export default function MovieCard({ movie, onSelect }) {
  return (
    <article className="movie-card">
      <div
        className="movie-poster"
        style={{ background: movie.color }}
      >
        <span className="poster-initial">
          {movie.title.charAt(0)}
        </span>

        <span className="movie-rating">
          ⭐ {movie.rating}
        </span>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p className="movie-meta">
          {movie.year} · {movie.genre}
        </p>

        <p className="movie-description">
          {movie.description}
        </p>

        <button
          className="details-btn"
          onClick={() => onSelect(movie)}
        >
          View Details
        </button>
      </div>
    </article>
  );
}