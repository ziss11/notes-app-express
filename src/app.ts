import dotenv from 'dotenv'
import express from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { NotesController } from './presentation/controllers/NotesController'
import { NotesRouter } from './presentation/routes/notes-router'
import { errorHandler } from './utils/error-handler'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const notesRouter = NotesRouter(container.resolve(NotesController))

app.use('/notes', notesRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server berjalan pada ${port}`)
})