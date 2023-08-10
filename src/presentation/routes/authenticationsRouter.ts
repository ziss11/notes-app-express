import { Router } from 'express';
import { asyncHandler } from '../../utils';
import { deleteAuthPayloadValidator, postAuthPayloadValidator, putAuthPayloadValidator } from '../../utils/validators/authenticationsValidator';
import { AuthenticationsController } from '../controllers/AuthenticationsController';
import { validationHandler } from '../middlewares/validationHandler';

export const AuthenticationsRouter = (authenticationsController: AuthenticationsController): Router => {
    const router = Router()

    router.route('/')
        .post(postAuthPayloadValidator, validationHandler, asyncHandler(authenticationsController.postAuthentication))
        .put(putAuthPayloadValidator, validationHandler, asyncHandler(authenticationsController.putAuthentication))
        .delete(deleteAuthPayloadValidator, validationHandler, asyncHandler(authenticationsController.deleteAuthentication))

    return router
}