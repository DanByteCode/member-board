import { Router } from 'express'
import { PostManager } from '../controllers/postController.js'

export const route = Router()

route.get('/', PostManager.getForm)
route.post('/', PostManager.createPost)
