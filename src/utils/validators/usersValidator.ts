import { body } from "express-validator";

export const userPayloadValidator = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be string'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be string'),
    body('fullname')
        .notEmpty().withMessage('fullname is required')
        .isString().withMessage('fullname must be string'),
]