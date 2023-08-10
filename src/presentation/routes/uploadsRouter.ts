import { Router } from 'express';
import { StorageController } from '../controllers/StorageController';



export const UploadsRouter = (storageController: StorageController): Router => {
    const router = Router()

    router.post('/images', storageController.postImage)

    return router
}