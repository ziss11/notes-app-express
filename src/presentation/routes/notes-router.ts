import express from 'express';
import { asyncHandler } from '../../utils';
import { notePayloadValidator } from '../../utils/validators/notes-validator';
import { NotesController } from "../controllers/NotesController";
import { validationHandler } from '../middlewares/validation-handler';

export const NotesRouter = (notesController: NotesController): express.Router => {
    const router = express.Router()

    router.route('/')
        .post(notePayloadValidator, validationHandler, asyncHandler(notesController.postNote))
        .get(asyncHandler(notesController.getNotes))

    router.route('/:id')
        .get(asyncHandler(notesController.getNoteById))
        .put(notePayloadValidator, validationHandler, asyncHandler(notesController.putNoteById))
        .delete(asyncHandler(notesController.deleteNoteById))

    return router
}