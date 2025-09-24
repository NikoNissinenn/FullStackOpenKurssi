const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to MongoDB')
mongoose.connect(url)
  .then((result) => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name has to be at least 3 characters long"]       
  },
  number: {
    type: String,
    required: [true, "Number is required"],
    minlength: [8, "Number has to be at least 8 characters long"],
    validate: {
      validator: function(v) {
        return /^(\d{2,3})-(\d{5,})$/.test(v)
      },
      message: `Number validation error. The first part requires 2 or 3 number characters followed by separator "-"`
    }
  },
}, { collection: 'persons' })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)