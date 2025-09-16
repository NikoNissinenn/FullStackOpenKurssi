const PersonForm = ({ addPerson, newName, newNumber, handlePersonChange, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handlePersonChange} name='namefield'/>
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} name='numberfield'/>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm