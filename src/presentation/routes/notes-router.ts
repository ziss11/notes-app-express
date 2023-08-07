import express, { Request, Response } from 'express';
import { NotesController } from "../controllers/NotesController";

export function NotesRouter(notesController: NotesController): express.Router {
    const router = express.Router()

    router.post('/', async (req: Request, res: Response) => {
        await notesController.postNote(req, res)
    })

    return router
}