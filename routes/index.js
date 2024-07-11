import { Router } from 'express'
import { getAllMessages } from '../controllers/indexController.js'

export const route = new Router()

route.get('/', getAllMessages)
