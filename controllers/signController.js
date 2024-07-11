import bcrypt from 'bcrypt'
import { User } from '../models/user.js'
import { config } from '../config.js'

function getForm (req, res) {
  res.render('sign-up', { message: false })
}
async function register (req, res, next) {
  const { nickname, username, password } = req.body
  const search = await User.findOne({ $or: [{ nickname }, { username }] }).exec()
  if (!search) {
    bcrypt.hash(password, config.SALT_ROUNDS, (err, hashedPassword) => {
      if (err) res.render('sign-up', { message: 'Internal error' })
      User.create({ nickname, username: username.toLowerCase(), password: hashedPassword })
        .then(() => {
          res.redirect('/login')
        }).catch(next)
    })
  } else {
    res.render('sign-up', { message: 'This user already exists' })
  }
}

export const Sign = { getForm, register }
