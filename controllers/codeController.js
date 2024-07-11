import { User } from '../models/user.js'
import { config } from '../config.js'

function getForm (req, res) {
  if (req.user) {
    res.render('code', { user: req.user, message: false })
  } else {
    res.redirect('/login')
  }
}

async function enterCode (req, res) {
  const code = req.body.code
  if (!req.user) res.redirect('/login')
  if (code === config.CODE_MEMBER) {
    await User.findByIdAndUpdate(req.user.id,
      {
        member: true
      }).exec()
    res.redirect('/')
  } else if (code === config.CODE_ADMIN) {
    await User.findByIdAndUpdate(req.user.id,
      {
        member: true,
        admin: true
      }).exec()
    res.redirect('/')
  } else {
    res.render('code', { user: req.user, message: 'Invalid code' })
  }
}
export const Code = { getForm, enterCode }
