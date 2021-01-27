const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.post('/auth/local', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.status(401).json(info)

    req.logIn(user, err => {
      if (err) return next(err)

      return res.json({ isAuthenticated: true })
    })
  })(req, res, next)
})

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/dashboard')
  }
)

router.get('/auth/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router
