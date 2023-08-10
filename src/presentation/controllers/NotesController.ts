import autobind from "autobind-decorator";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { AddNote } from "../../domain/usecases/notes/AddNote";
import { DeleteNoteById } from "../../domain/usecases/notes/DeleteNoteById";
import { EditNoteById } from "../../domain/usecases/notes/EditNoteById";
import { ExportNotes } from "../../domain/usecases/notes/ExportNotes";
import { GetNoteById } from "../../domain/usecases/notes/GetNoteById";
import { GetNotes } from "../../domain/usecases/notes/GetNotes";

@injectable()
export class NotesController {
    constructor(
        @inject(AddNote) private addNoteCase: AddNote,
        @inject(GetNotes) private getNotesCase: GetNotes,
        @inject(GetNoteById) private getNoteByIdCase: GetNoteById,
        @inject(EditNoteById) private editNoteByIdCase: EditNoteById,
        @inject(DeleteNoteById) private deleteNoteByIdCase: DeleteNoteById,
        @inject(ExportNotes) private exportNotesCase: ExportNotes
    ) { }

    @autobind
    async postNote(req: Request, res: Response) {
        const credentialId = res.locals.userId
        const noteId = await this.addNoteCase.execute({ ...req.body, userId: credentialId })
        res.status(201).json({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: { noteId }
        })
    }

    @autobind
    async getNotes(req: Request, res: Response) {
        const userId = res.locals.userId
        const notes = await this.getNotesCase.execute(userId)
        res.json({
            status: 'success',
            data: { notes }
        })
    }

    @autobind
    async getNoteById(req: Request, res: Response) {
        const { id } = req.params
        const userId = res.locals.userId
        const note = await this.getNoteByIdCase.execute(id, userId)
        res.json({
            status: 'success',
            data: { note }
        })
    }

    @autobind
    async putNoteById(req: Request, res: Response) {
        const { id } = req.params
        const userId = res.locals.userId

        await this.editNoteByIdCase.execute(id, { ...req.body, userId })
        res.json({
            status: 'success',
            message: 'Catatan berhasil diperbarui'
        })
    }

    @autobind
    async deleteNoteById(req: Request, res: Response) {
        const { id } = req.params
        const userId = res.locals.userId

        await this.deleteNoteByIdCase.execute(id, userId)
        res.json({
            status: 'success',
            message: 'Catatan berhasil dihapus'
        })
    }

    @autobind
    async exportNotes(req: Request, res: Response) {
        const userId = res.locals.userId
        const targetEmail = req.body.targetEmail

        await this.exportNotesCase.execute(userId, targetEmail)
        res.status(201).json({
            status: 'success',
            message: 'Permintaan anda dalam antrean'
        })
    }
}