import dotenv from 'dotenv'
import express from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { AuthenticationsController } from './presentation/controllers/AuthenticationsController'
import { CollaborationsController } from './presentation/controllers/CollaborationsController'
import { NotesController } from './presentation/controllers/NotesController'
import { StorageController } from './presentation/controllers/StorageController'
import { UsersController } from './presentation/controllers/UsersController'
import { authenticateJwt } from './presentation/middlewares/authenticateJwt'
import { errorHandler } from './presentation/middlewares/errorHandler'
import { AuthenticationsRouter } from './presentation/routes/authenticationsRouter'
import { CollaborationsRouter } from './presentation/routes/collaborationsRouter'
import { NotesRouter } from './presentation/routes/notesRouter'
import { UploadsRouter } from './presentation/routes/uploadsRouter'
import { UsersRouter } from './presentation/routes/usersRouter'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

const notesRouter = NotesRouter(container.resolve(NotesController))
const usersRouter = UsersRouter(container.resolve(UsersController))
const authsRouter = AuthenticationsRouter(container.resolve(AuthenticationsController))
const collaborationsRouter = CollaborationsRouter(container.resolve(CollaborationsController))
const uploadsRouter = UploadsRouter(container.resolve(StorageController))

app.use(express.json())
app.use(express.static('public'));

app.use('/users', usersRouter)
app.use('/authentications', authsRouter)
app.use('/notes', authenticateJwt, notesRouter)
app.use('/collaborations', authenticateJwt, collaborationsRouter)
app.use('/upload', uploadsRouter)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`)
})