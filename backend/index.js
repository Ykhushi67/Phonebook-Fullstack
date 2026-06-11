// const http = require('http')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
const mongoose = require('mongoose')
const Person = require('./models/person')



// const { setServers } = require('node:dns/promises');
// setServers(['8.8.8.8', '1.1.1.1']);

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url = process.env.MONGODB_URI

// mongoose.set('strictQuery', false)

// console.log('connecting to', url)
// mongoose.connect(url, { family: 4 })

//  .then(result => {
//     console.log('connected to MongoDB')
//   })
//   .catch(error => {
//     console.log('error connecting to MongoDB:', error.message)
//   })

//   // const Person = require('./models/person')

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// })

// personSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// module.exports = mongoose.model('Person', personSchema)

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
   
  ]

  app.get('/api/persons', (request, response) => {
   Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = persons.find(note => note.id === id)

    if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

  // Person.findById(request.params.id).then(person => {
  //   response.json(person)
  })

  // Note.findById(request.params.id)
  //   .then(person => {
  //     if (person) {
  //       response.json(person)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error)
  //     response.status(500).end()
  //   })


app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

// app.post('/api/notes', (request, response) => {
//   const note = request.body
//   console.log(note)
//   response.json(note)
// })

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

// app.post('/api/persons', (request, response) => {
//   const body = request.body

//   if (!body.content) {
//     return response.status(400).json({ 
//       error: 'content missing' 
//     })
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     id: generateId(),
//   }

//   persons = persons.concat(note)

//   response.json(note)
// })

app.post('/api/persons', (request, response,next) => {
  const body = request.body


  // 1. Basic validation
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  // 2. Create a new instance of the Person model
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  // 3. Save the person to the database
  person.save()
    .then(savedPerson => {
      // 4. Respond with the saved object
      response.json(savedPerson)
    })
    .catch(error => next(error)) // Important: Handle errors!
})

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
 
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)


