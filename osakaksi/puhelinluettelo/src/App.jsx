import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  // npx json-server --port 3001 db.json
  const fetchPersons = () => {
    try {
      axios.get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
        console.log("JSON data fetched from localhost")})
    } catch (error) {
      console.log(error, error.message)
    } 
  }
  
  useEffect(() => {
    fetchPersons() 
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    };

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    } else {
      try {
        axios.post("http://localhost:3001/persons", newPerson)
        .then(response => {
          console.log(response)
        })
      } catch (error) {
        console.log(error, error.message)
      }      
    }

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const filteredPersons = newFilter ?
      persons.filter((person) => (
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      ))
      : persons
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App