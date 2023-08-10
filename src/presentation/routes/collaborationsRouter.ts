import { Router } from "express";
import { asyncHandler } from "../../utils";
import { colaborationPayloadValidator } from "../../utils/validators/collaborationsValidator";
import { CollaborationsController } from "../controllers/CollaborationsController";
import { validationHandler } from "../middlewares/validationHandler";

export const CollaborationsRouter = (collaborationsController: CollaborationsController): Router => {
    const router = Router()

    router.route('/')
        .post(colaborationPayloadValidator, validationHandler, asyncHandler(collaborationsController.postCollaboration))
        .delete(colaborationPayloadValidator, validationHandler, asyncHandler(collaborationsController.deleteCollaboration))

    return router
}