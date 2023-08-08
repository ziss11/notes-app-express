import dotenv from 'dotenv'
import express from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { NotesController } from './presentation/controllers/NotesController'
import { errorHandler } from './presentation/middlewares/error-handler'
import { NotesRouter } from './presentation/routes/notes-router'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const notesRouter = NotesRouter(container.resolve(NotesController))

app.use('/notes', notesRouter)

app.use(errorHandler)
app.listen(port, () => console.log(`Server berjalan pada http://localhost:${port}`))