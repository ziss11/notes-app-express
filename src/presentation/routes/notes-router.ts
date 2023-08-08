import express, { Request, Response } from 'express';
import { notePayloadValidator } from '../../utils/validators/notes-validator';
import { NotesController } from "../controllers/NotesController";
import { validationHandler } from '../middlewares/validation-handler';

export const NotesRouter = (notesController: NotesController): express.Router => {
    const router = express.Router()

    router.post('/', notePayloadValidator, validationHandler, async (req: Request, res: Response) => {
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