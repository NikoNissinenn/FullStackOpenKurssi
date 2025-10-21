import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    if (baseUrl) {
      axios.get(baseUrl)
        .then((response) => setResources(response.data))
        .catch((error) => console.log(error))
    }
  }, [baseUrl]);

  const create = (resource) => {
    axios.post(baseUrl, resource)
      .then((response) => {
        const newData = resources.concat(response.data)
        setResources(newData)
      })
      .catch((error) => console.log(error))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')


  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        Content: <input className='input-field' {...content} />
        <button>Create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        Name: <input className='input-field' {...name} /> <br/>
        Number: <input className='input-field' {...number} />
        <button>Create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App