import express, { Request, Response } from 'express';
import { NotesController } from "../controllers/NotesController";

export const NotesRouter = (notesController: NotesController): express.Router => {
    const router = express.Router()

    router.post('/', async (req: Request, res: Response) => {
        await notesController.postNote(req, res)
    })

    router.get('/', async (req: Request, res: Response) => {
        await notesController.getNotes(req, res)
    })

    router.get('/:id', async (req: Request, res: Response) => {
        await notesController.getNoteById(req, res)
    })

    return router
}