import { Router } from 'express';
import { asyncHandler } from '../../utils';
import { deletePayloadValidator, postPayloadValidator, putPayloadValidator } from '../../utils/validators/authenticationsValidator';
import { AuthenticationsController } from '../controllers/AuthenticationsController';
import { validationHandler } from '../middlewares/validationHandler';

export const AuthenticationsRouter = (authenticationsController: AuthenticationsController): Router => {
    const router = Router()

    router.route('/')
        .post(postPayloadValidator, validationHandler, asyncHandler(authenticationsController.postAuthentication))
        .put(putPayloadValidator, validationHandler, asyncHandler(authenticationsController.putAuthentication))
        .delete(deletePayloadValidator, validationHandler, asyncHandler(authenticationsController.deleteAuthentication))

    return router
}