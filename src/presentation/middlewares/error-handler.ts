import { NextFunction, Request, Response } from "express";
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
    } else {
        return res.status(500).json({
            status: 'error',
            message: 'Maaf terjadi kegagalan pada server kami'
        })
    }
}