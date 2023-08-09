import { body } from "express-validator";

export const postPayloadValidator = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be string'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be string'),
]

export const putPayloadValidator = [
    body('refreshToken')
        .notEmpty().withMessage('RefreshToken is required')
        .isString().withMessage('RefreshToken must be string'),
]

export const deletePayloadValidator = [
    body('refreshToken')
        .notEmpty().withMessage('RefreshToken is required')
        .isString().withMessage('RefreshToken must be string'),
]