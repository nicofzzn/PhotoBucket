const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
  },
  password: {
    type: String,
  },
  photo: {
    type: String,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
