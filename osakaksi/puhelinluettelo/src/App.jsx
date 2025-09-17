import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from "axios"
import personService from "./services/persons"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // npx json-server --port 3001 db.json
  useEffect(() => {
    try {
      personService.getAll()
        .then(response => setPersons(response.data))
    } catch (error) {
      console.log(error, error.message)
    }     
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName)
    
    if (existingPerson) {
      const confirmmessage = window.confirm(`${newName} is already added to phonebook, replace number with new one?`);
        if (confirmmessage === true) {
          try {
            const updatedPerson = { 
              name: existingPerson.name,
              number: newNumber,
              id: existingPerson.id
            }
            personService.update(updatedPerson.id, updatedPerson)
              .then(response => {              
                setPersons(persons.map((person) => 
                  person.id === updatedPerson.id ? response.data : person
                ))
                console.log(response)})
            setNewName("");
            setNewNumber("");
            setSuccessMessage(`Person '${updatedPerson.name}' was updated in the server`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)           
          } catch (error) {
            console.log(error, error.message)
            setErrorMessage(`Person '${existingPerson.name}' was not updated in the server, something went wrong`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }          
        }
    } else {
      try {
        const newPerson = {
          name: newName,
          number: newNumber,
          id: (Math.ceil(Math.random()*1000000)).toString()
        };
        personService.create(newPerson)
          .then(response => console.log(response)) 
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
        setSuccessMessage(`Person '${newPerson.name}' was added to the server`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)    
      } catch (error) {
        console.log(error, error.message)
        setErrorMessage(`Person '${newPerson.name}' was not added to the server, something went wrong`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
            setSuccessMessage(`Person '${name}' was removed from the server`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })}
    } catch (error) {
      console.log(error, error.message)
      setErrorMessage(`Person '${name}' was not removed from the server, something went wrong`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
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
      <Persons persons={persons} newFilter={newFilter} removePerson={removePerson} />
    </div>
  )
}

export default App