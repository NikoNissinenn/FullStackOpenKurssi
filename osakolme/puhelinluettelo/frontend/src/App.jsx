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
    personService.getAll()
      .then(response => {
        if (response.data.length > 0) {
          setPersons(response.data)
          setSuccessMessage(`Fetched data from ${personService.baseUrl}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)  
        } 
      })
      .catch(error => {
        setErrorMessage(`Failed to fetch data from ${personService.baseUrl}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})       
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName)
    
    if (existingPerson) {
      const confirmmessage = window.confirm(`${newName} is already added to phonebook, replace number with new one?`);
        if (confirmmessage === true) {
          const updatedPerson = { 
            id: existingPerson.id,
            name: existingPerson.name,
            number: newNumber            
          }
          personService.update(updatedPerson.id, updatedPerson)
            .then(response => {            
              setPersons(persons.map((person) => 
                person.id === updatedPerson.id ? response.data : person
              ))                
          })
          .catch(error => {                
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter((person) => person.id !== updatedPerson.id))                              
          })
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`Person '${updatedPerson.name}' was updated in the server`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)          
        }
    } else {      
      const newPerson = {
        id: (Math.ceil(Math.random()*100000)).toString(),
        name: newName,
        number: newNumber        
      };
      personService.create(newPerson)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson));
          setSuccessMessage(`Person '${addedPerson.name}' was added to the server`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)  
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)}          
        )                
    }
    setNewName("");
    setNewNumber("");
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id))
          setSuccessMessage(`Person '${name}' was removed from the server`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter((person) => person.id !== id))
        })        
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