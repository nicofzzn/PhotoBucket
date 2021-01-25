const mongoose = require('mongoose')

const db = () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = db
