import { User } from '../models/user.js'
import { Post } from '../models/post.js'

async function deletePost (req, res, next) {
  try {
    if (!req.user) res.redirect('/')
    const idUser = req.user?.id
    const idPost = req.params?.id
    const currentUser = await User.findById(idUser)
    const indexMessage = currentUser.messages.findIndex(m => m.toString() === idPost)
    if (indexMessage >= 0) {
      currentUser.messages.splice(indexMessage, 1)
      await Post.findByIdAndDelete(idPost)
      await currentUser.save()
    } else if (currentUser.admin) {
      const delPost = await Post.findById(idPost)
      const userPost = await User.findById(delPost.author)
      const indexMessageUser = userPost.messages.findIndex(m => m.toString() === idPost)
      userPost.messages.splice(indexMessageUser, 1)
      await delPost.deleteOne()
      await userPost.save()
    }
  } catch (next) {
  } finally {
    res.redirect('/')
  }
}

export const DeleteManager = { deletePost }