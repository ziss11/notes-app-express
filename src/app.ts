import dotenv from 'dotenv'
import express from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { AuthenticationsController } from './presentation/controllers/AuthenticationsController'
import { NotesController } from './presentation/controllers/NotesController'
import { UsersController } from './presentation/controllers/UsersController'
import { authenticateJwt } from './presentation/middlewares/authenticateJwt'
import { errorHandler } from './presentation/middlewares/errorHandler'
import { AuthenticationsRouter } from './presentation/routes/authenticationsRouter'
import { NotesRouter } from './presentation/routes/notesRouter'
import { UsersRouter } from './presentation/routes/usersRouter'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

const notesRouter = NotesRouter(container.resolve(NotesController))
const usersRouter = UsersRouter(container.resolve(UsersController))
const authsRouter = AuthenticationsRouter(container.resolve(AuthenticationsController))

app.use(express.json())

app.use('/users', usersRouter)
app.use('/authentications', authsRouter)
app.use('/notes', authenticateJwt, notesRouter)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`)
})