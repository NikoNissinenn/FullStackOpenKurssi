import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from "axios"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  // npx json-server --port 3001 db.json
  useEffect(() => {
    try {
      personService.getAll()
        .then(response => setPersons(response.data))
      console.log(`Data fetched from ${personService.baseUrl}`)
    } catch (error) {
      console.log(error, error.message)
    }     
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: (Math.ceil(Math.random()*1000000)).toString()
    };

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    } else {
      try {
        personService.create(newPerson)
          .then(response => console.log(response)) 
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");    
      } catch (error) {
        console.log(error, error.message)
      }    
    }
  }

  const removePerson = (id, name) => {
    try {
      if (window.confirm(`Delete ${name}?`)) {
        personService.deletePerson(id)
          .then((response) => {
            setPersons(persons.filter((person) => person.id !== id))
            console.log(response)
          })}
    } catch (error) {
      console.log(error, error.message)
    } 
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
      <Persons filteredPersons={filteredPersons} removePerson={removePerson} />
    </div>
  )
}

export default App