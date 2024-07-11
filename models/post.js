import mongoose from 'mongoose'

const Schema = mongoose.Schema
const PostSchema = new Schema({
  author: { type: Schema.ObjectId, ref: 'User' },
  title: { type: String, required: true, minLength: 4, maxLength: 32 },
  message: { type: String, required: true, minLength: 4, maxLength: 64 },
  date: { type: Date }
})

export const Post = mongoose.model('Post', PostSchema)
