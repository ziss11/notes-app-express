import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { ClientError } from "../../utils/exceptions/ClientError";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err.message)

    if (err instanceof ClientError) {
        return res.status(err.statusCode).json({
            status: 'fail',
            message: err.message
        })
    } else if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                status: 'fail',
                error: 'Ukuran file melebihi batas yang diizinkan',
            });
        }
    } else {
        return res.status(500).json({
            status: 'error',
            message: 'Maaf terjadi kegagalan pada server kami'
        })
    }
}