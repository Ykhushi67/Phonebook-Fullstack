// const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))





// let notes = [
//   {
//     id: "1",
//     name: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]
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
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = persons.find(note => note.id === id)

    if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

})

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

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})