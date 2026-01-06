function FilterForm({ filter, setFilter }) {
  return (
    <input
      type="text"
      placeholder="Filter by title..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
}

export default FilterForm;
