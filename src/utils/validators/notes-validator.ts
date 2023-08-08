import { body } from "express-validator";

export const notePayloadValidator = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be string'),
    body('body')
        .notEmpty().withMessage('Body is required')
        .isString().withMessage('Body must be string'),
    body('tags').isArray({ min: 1 }).withMessage('At least one tag is required'),
    body('tags.*').isString().withMessage('Tags must be strings'),
]