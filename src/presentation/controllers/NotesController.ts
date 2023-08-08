import autobind from "autobind-decorator";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { AddNote } from "../../domain/usecases/notes/AddNote";
import { DeleteNoteById } from "../../domain/usecases/notes/DeleteNoteById";
import { EditNoteById } from "../../domain/usecases/notes/EditNoteById";
import { GetNoteById } from "../../domain/usecases/notes/GetNoteById";
import { GetNotes } from "../../domain/usecases/notes/GetNotes";

@injectable()
export class NotesController {
    constructor(
        @inject(AddNote) private addNoteCase: AddNote,
        @inject(GetNotes) private getNotesCase: GetNotes,
        @inject(GetNoteById) private getNoteByIdCase: GetNoteById,
        @inject(EditNoteById) private editNoteByIdCase: EditNoteById,
        @inject(DeleteNoteById) private deleteNoteByIdCase: DeleteNoteById
    ) { }

    @autobind
    async postNote(req: Request, res: Response, next: NextFunction) {
        const noteId = await this.addNoteCase.execute(req.body)
        res.status(201).json({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: { noteId }
        })
    }

    @autobind
    async getNotes(req: Request, res: Response, next: NextFunction) {
        const notes = await this.getNotesCase.execute()
        res.json({
            status: 'success',
            data: { notes }
        })
    }

    @autobind
    async getNoteById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const note = await this.getNoteByIdCase.execute(id)
        res.json({
            status: 'success',
            data: { note }
        })
    }

    @autobind
    async putNoteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            await this.editNoteByIdCase.execute(id, req.body)
            res.json({
                status: 'success',
                message: 'Catatan berhasil diperbarui'
            })
        } catch (error) {
            next(error)
        }
    }

    @autobind
    async deleteNoteById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        await this.deleteNoteByIdCase.execute(id)
        res.json({
            status: 'success',
            message: 'Catatan berhasil dihapus'
        })
    }
}