const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://khushi3050:<Alwar%2369>@cluster0.n0fbi7c.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
               "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
})

const person = mongoose.model('person', noteSchema)

const person = new Note({
       "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
  
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})