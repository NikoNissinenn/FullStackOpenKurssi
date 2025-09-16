const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      Filter shown with <input value={newFilter} onChange={handleFilterChange} name='filterfield'/>
    </div>
  )
}

export default Filter