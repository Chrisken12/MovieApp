import { Link } from 'react-router-dom'

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card" aria-label={`View ${movie.title} details and trailer`}>
      <div className="poster-wrap">
        <img className="movie-poster" src={movie.posterURL} alt={`Poster artwork for ${movie.title}`} loading="lazy" onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85' }} />
        <span className="poster-year">{movie.year}</span>
        <span className="poster-rating"><span>★</span> {Number(movie.rating).toFixed(1)}</span>
        <div className="poster-overlay"><span>VIEW DETAILS & TRAILER</span><b>↗</b></div>
      </div>
      <div className="movie-meta"><div><span className="movie-genre">{movie.genre || 'YOUR COLLECTION'}</span><h3>{movie.title}</h3></div><span className="card-arrow" aria-hidden="true">↗</span></div>
      <p className="movie-description">{movie.description}</p>
    </Link>
  )
}

export default MovieCard
