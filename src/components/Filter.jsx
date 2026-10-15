function Filter({ title, rate, onTitleChange, onRateChange }) {
  return (
    <div className="filters" aria-label="Filter collection">
      <label className="search-field"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg><input type="search" value={title} onChange={(event) => onTitleChange(event.target.value)} placeholder="Find a title..." aria-label="Filter by title" /></label>
      <span className="filter-divider" />
      <label className="rating-filter"><span>RATING</span><select value={rate} onChange={(event) => onRateChange(event.target.value)} aria-label="Filter by minimum rating"><option value="all">All</option><option value="4.5">4.5+</option><option value="4">4.0+</option><option value="3">3.0+</option></select><span className="select-chevron">⌄</span></label>
    </div>
  )
}

export default Filter
