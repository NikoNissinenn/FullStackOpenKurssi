const express = require("express")
const app = express()
const PORT = 3001
const morgan = require("morgan")

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/", (request, response) => {
  response.send('<h1> Hello World! </h1>')
})

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/info", (request, response) => {
  response.send(`
    <p>
      Phonebook has info for ${persons.length} people
    <br/><br/>
      ${new Date()}
    </p>
    `)
})

app.get(`/api/persons/:id`, (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  const person = request.body

  if (!person.name) {
    return response.status(400).json({ 
      error: 'Name is missing' 
    })
  }
  if (!person.number) {
    return response.status(400).json({ 
      error: 'Number is missing' 
    })
  }

  persons.map((p) => {
    if (p.name === person.name) {
      return response.status(400).json({ 
      error: 'Name must be unique. Duplicate name issue' 
    })
    }
    if (p.id === person.id) {
      return response.status(400).json({ 
      error: 'ID must be unique. Duplicate ID issue' 
    })
    }    
  })
  response.json(person)
})

app.listen(PORT)
console.log(`Server running on http://localhost:${PORT}`)