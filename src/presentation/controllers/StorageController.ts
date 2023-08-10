import autobind from "autobind-decorator";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from 'path';
import { injectable } from "tsyringe";
import { Constants } from "../../utils/constants";
import { InvariantError } from "../../utils/exceptions/InvariantError";

const IMAGE_DESTINATION = path.join(__dirname, '../../../public/images');

@injectable()
export class StorageController {

    @autobind
    postImage(req: Request, res: Response, next: NextFunction) {
        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, IMAGE_DESTINATION)
            },
            filename(req, file, cb) {
                const filename = file.originalname.replace(/\s+/g, '');
                cb(null, `${+Date.now()}-${filename}`);
            },
        })

        const fileFilter = function (req: any, file: any, cb: any) {
            if (!file.originalname.toLowerCase().match(Constants.ALLOWED_IMAGE_EXTENSIONS)) {
                return cb(new InvariantError('Hanya file gambar yang diizinkan!'), false);
            }
            cb(null, true);
        };

        const upload = multer({
            storage,
            fileFilter,
            limits: {
                fileSize: 526000,
            },
        })

        upload.single('data')(req, res, (err) => {
            if (err) {
                return next(err);
            }
            if (!req.file) {
                return next(new InvariantError('Pilih file gambar untuk diunggah'))
            }
            try {
                const filename = req.file?.filename;
                const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/images/${filename}`
                res.status(201).json({
                    status: 'success',
                    data: { fileLocation }
                })
            } catch (error) {
                next(error)
            }
        });
    }
}