function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <img className="movie-poster" src={movie.posterURL} alt={`Poster artwork for ${movie.title}`} loading="lazy" onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85' }} />
        <span className="poster-year">{movie.year}</span>
        <span className="poster-rating"><span>★</span> {Number(movie.rating).toFixed(1)}</span>
        <div className="poster-overlay"><span>IN YOUR COLLECTION</span><b>↗</b></div>
      </div>
      <div className="movie-meta"><div><span className="movie-genre">{movie.genre || 'YOUR COLLECTION'}</span><h3>{movie.title}</h3></div><span className="card-arrow" aria-hidden="true">↗</span></div>
      <p className="movie-description">{movie.description}</p>
    </article>
  )
}

export default MovieCard
