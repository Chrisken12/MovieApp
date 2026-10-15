import MovieCard from './MovieCard'

function MovieList({ movies }) {
  if (movies.length === 0) {
    return <div className="empty-state"><span className="empty-star">✳</span><h3>Nothing on this reel.</h3><p>Try another search or rating, or add a new title to your collection.</p></div>
  }

  return <div className="movie-grid">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>
}

export default MovieList
