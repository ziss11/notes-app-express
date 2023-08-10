import { Router } from 'express';
import { asyncHandler } from '../../utils';
import { notePayloadValidator } from '../../utils/validators/notesValidator';
import { NotesController } from "../controllers/NotesController";
import { validationHandler } from '../middlewares/validationHandler';

export const NotesRouter = (notesController: NotesController): Router => {
    const router = Router()

    router.route('/')
        .post(notePayloadValidator, validationHandler, asyncHandler(notesController.postNote))
        .get(asyncHandler(notesController.getNotes))

    router.route('/:id')
        .get(asyncHandler(notesController.getNoteById))
        .put(notePayloadValidator, validationHandler, asyncHandler(notesController.putNoteById))
        .delete(asyncHandler(notesController.deleteNoteById))

    return router
}