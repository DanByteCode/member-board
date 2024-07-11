import { Router } from 'express'
import { DeleteManager } from '../controllers/deleteController.js'

export const route = Router()

route.get('/:id', DeleteManager.deletePost)
