import dotenv from 'dotenv'
import express from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { NotesController } from './presentation/controllers/NotesController'
import { UsersController } from './presentation/controllers/UsersController'
import { errorHandler } from './presentation/middlewares/error-handler'
import { NotesRouter } from './presentation/routes/notes-router'
import { UsersRouter } from './presentation/routes/users-router'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

const notesRouter = NotesRouter(container.resolve(NotesController))
const usersRouter = UsersRouter(container.resolve(UsersController))

app.use(express.json())

app.use('/notes', notesRouter)
app.use('/users', usersRouter)

app.use(errorHandler)
app.listen(port, () => console.log(`Server berjalan pada http://localhost:${port}`))