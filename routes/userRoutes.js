const express = require('express')
const User = require('../models/User')
const router = express.Router()
// const requireLogin = require('../middlewares/requireLogin')

router.get('/api/user', (req, res) => {
  if (!req.user) {
    return res.status(401).end()
  }
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    photo: req.user.photo,
  })
})

router.post('/api/user', async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400)
      throw new Error('Email has already registered')
    }

    if (password !== passwordConfirm) {
      res.status(400)
      throw new Error('Password missmatch')
    }

    if (password.length < 6) {
      res.status(400)
      throw new Error('Password must have at least 6 character')
    }

    await new User({
      name,
      email,
      password,
    }).save()

    res.json('User Created')
  } catch (error) {
    res.json(error.message)
  }
})

module.exports = router
