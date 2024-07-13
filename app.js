import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'url'
import { config } from './config.js'
import { route as indexRouter } from './routes/index.js'
import { route as signRouter } from './routes/sign-up.js'
import { route as loginRouter } from './routes/login.js'
import { route as logoutRouter } from './routes/log-out.js'
import { route as postRouter } from './routes/new-post.js'
import { route as codeRouter } from './routes/code.js'
import { route as deleteRouter } from './routes/delete.js'
import { errorHandler } from './middlewares/error.js'
import setupSession from './middlewares/sesion.js'
import morgan from 'morgan'

const app = express()
setupSession(app)
const dirname = path.dirname(fileURLToPath(import.meta.url))
app.set('view engine', 'ejs')
app.use(morgan('dev'))

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(dirname, 'public')))

app.use('/sign-up', signRouter)
app.use('/login', loginRouter)
app.use('/new-post', postRouter)
app.use('/log-out', logoutRouter)
app.use('/enter-code', codeRouter)
app.use('/delete', deleteRouter)
app.use('/', indexRouter)

app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log('Server online: http://localhost:' + config.PORT)
})
