const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require('cors')
const Person = require("./models/person")
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

morgan.token('body', function getId (req) {
  return JSON.stringify(req.body)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}


app.get("/", (request, response) => {
  response.send('<h1> Hello World! </h1>')
})

app.get("/api/persons", (request, response, next) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  }).catch(error => next(error))
})

app.get("/info", (request, response, next) => {
  Person.find({}).then((persons) => {
    response.send(`
        <p>
          Phonebook has info for ${persons.length} people
        <br/><br/>
          ${new Date()}
        </p>
        `
      )
  })  
  .catch(error => next(error))
})

app.get(`/api/persons/:id`, (request, response, next) => {
  const id = request.params.id
  if (!id) {
    return response.status(400).end()
  }

  Person.findById(id)
    .then((result) => {
      response.json(result)
      response.status(200).end()
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end()
    }).catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'Name is missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'Number is missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })  

  person.save().then((savedPerson) => {
    response.json(savedPerson)
    response.status(201).end()
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  Person.findById(request.params.id)
    .then(person => {

      if (!person) {
        return response.status(404).end()
      }

      person.name = body.name
      person.number = body.number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
