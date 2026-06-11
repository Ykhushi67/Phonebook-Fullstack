

const mongoose = require('mongoose')

const { setServers } = require('node:dns/promises');
setServers(['8.8.8.8', '1.1.1.1']);

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://khushi3050:Alwar%2369@cluster0.n0fbi7c.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 }) 

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Ada lovelace',
  number: '040-123456',
})

// person.save().then(result => {
//   console.log('person saved!')
//   mongoose.connection.close()
// })

Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})

