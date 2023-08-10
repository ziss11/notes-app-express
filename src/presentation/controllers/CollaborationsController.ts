import autobind from "autobind-decorator";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { AddCollaboration } from "../../domain/usecases/collaborations/AddCollaboration";
import { DeleteCollaboration } from "../../domain/usecases/collaborations/DeleteCollaboration";

@injectable()
export class CollaborationsController {
    constructor(
        @inject(AddCollaboration) private addCollaborationCase: AddCollaboration,
        @inject(DeleteCollaboration) private deleteCollaorationCase: DeleteCollaboration,
    ) { }

    @autobind
    async postCollaboration(req: Request, res: Response) {
        const owner = res.locals.userId
        const { noteId, userId } = req.body

        const collaborationId = await this.addCollaborationCase.execute(noteId, userId, owner)
        res.status(201).json({
            status: 'success',
            message: 'Kolaborasi berhasil ditambahkan',
            data: { collaborationId }
        })
    }

    @autobind
    async deleteCollaboration(req: Request, res: Response) {
        const owner = res.locals.userId
        const { noteId, userId } = req.body

        await this.deleteCollaorationCase.execute(noteId, userId, owner)
        res.json({
            status: 'success',
            message: 'Kolaborasi berhasil dihapus',
        })
    }
}