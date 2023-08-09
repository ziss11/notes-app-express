import { Router } from "express";
import { asyncHandler } from "../../utils";
import { userPayloadValidator } from "../../utils/validators/usersValidator";
import { UsersController } from "../controllers/UsersController";
import { validationHandler } from "../middlewares/validation-handler";

export const UsersRouter = (usersController: UsersController): Router => {
    const router = Router()

    router.route('/')
        .post(userPayloadValidator, validationHandler, asyncHandler(usersController.postUser))
        .get(asyncHandler(usersController.getUserByUsername))

    router.get('/:id', asyncHandler(usersController.getUserById))

    return router
}