const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id })

        if (existingUser) {
          return cb(null, existingUser)
        }

        const user = await new User({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
        }).save()

        cb(null, user)
      } catch (error) {
        throw new Error(error.message)
      }
    }
  )
)

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, { message: 'Wrong email or password' })
        }
        if (!user.comparePassword) {
          return done(null, false, { message: 'Wrong email or password' })
        }

        done(null, user)
      } catch (error) {
        console.log(error.message)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})
