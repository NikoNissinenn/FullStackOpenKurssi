import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName
    };

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
      setNewName("");
      return;
    }

    setPersons(persons.concat(newPerson));
    setNewName("");
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} name='lisays'/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return <li key={person.name}>{person.name}</li>
        })}
      </ul>
    </div>
  )
}

export default App