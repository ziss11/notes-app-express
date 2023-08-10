import { body } from "express-validator";

export const colaborationPayloadValidator = [
    body('noteId')
        .notEmpty().withMessage('NoteId is required')
        .isString().withMessage('NoteId must be string'),
    body('userId')
        .notEmpty().withMessage('UserId is required')
        .isString().withMessage('UserId must be string'),
]