import { Post } from '../models/post.js'

function getForm (req, res, next) {
  if (req.user) {
    res.render('create', { user: req.user })
  } else {
    res.redirect('/login')
  }
}

async function createPost (req, res, next) {
  const user = req.user
  if (!user) {
    res.redirect('login')
  }
  const { title, message } = req.body
  const newPost = await Post.create({
    author: req.user.id,
    title,
    message,
    date: new Date()
  })
  user.messages.push(newPost._id)
  user.save()
    .then(() => { res.redirect('/') })
    .catch(next)
}

export const PostManager = { getForm, createPost }
