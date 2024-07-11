import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  nickname: { type: String, required: true, minLength: 4, maxLength: 14, unique: true },
  username: { type: String, required: true, minLength: 4, maxLength: 14, unique: true },
  password: { type: String, required: true },
  member: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  messages: [{ type: Schema.ObjectId, ref: 'Post' }]
})
const format = {
  transform: () => (doc, ret, options) => {
    ret.id = ret._id
    delete ret.username
    delete ret.password
    delete ret._id
    delete ret._v
    return ret
  }
}
UserSchema.set('toObject', format)
UserSchema.set('toString', format)

export const User = mongoose.model('User', UserSchema)
