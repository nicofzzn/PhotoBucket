const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('dotenv').config()

const db = require('./services/db')
db()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(morgan('tiny'))
app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24,
    keys: [process.env.COOKIE_KEY],
  })
)
app.use(passport.initialize())
app.use(passport.session())
require('./services/passport')

// routes
app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/userRoutes'))

app.get('/error', (req, res) => {
  throw new Error('The error message')
})

app.use(require('./middlewares/errorMiddleware'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
