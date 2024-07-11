import session from 'express-session'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'
import { config } from '../config.js'
import { User } from '../models/user.js'

export default function setupSession (app) {
  app.use(session({ secret: config.SECRET, resave: false, saveUninitialized: true }))
  app.use(passport.session())
  app.use(passport.initialize())
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const searchName = username.toLowerCase()
      const matchUser = await User.findOne({ username: searchName }).exec()
      if (matchUser) {
        const matchPassword = await bcrypt.compare(password, matchUser.password)
        if (matchPassword) {
          return done(null, matchUser)
        } else {
          return done(null, false, { message: 'Incorrect password' })
        }
      } else {
        return done(null, false, { message: 'Incorrect user' })
      }
    } catch (err) {
      return done(err)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })
  app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
  })
  return passport
}
