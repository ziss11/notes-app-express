import { NextFunction, Request, Response } from "express";

export function asyncHandler(callback: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await callback(req, res, next);
        } catch (error) {
            next(error)
        }
    };
}