import mongoose from 'mongoose'
import dateFormat from 'dateformat'
import { config } from '../config.js'
import { Post } from '../models/post.js'

mongoose.set('strictQuery', false)
mongoose.connect(config.MDB)
  .then(() => {
    console.log('Database connected')
  }).catch((err) => {
    console.log(err.message)
  })

export async function getAllMessages (req, res, next) {
  const search = await Post.find({}).populate('author')
  const messages = search.length > 0
    ? search.map((data) => {
      return {
        id: data.id,
        authorName: data.author.nickname,
        title: data.title,
        message: data.message,
        date: dateFormat(data.date, 'd mmm yyyy')
      }
    })
    : []
  res.render('index', { user: req.user, messages })
}
