import { Router } from 'express'
import { Code } from '../controllers/codeController.js'

export const route = Router()

route.get('/', Code.getForm)
route.post('/', Code.enterCode)
