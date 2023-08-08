import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { AddNote } from "../../domain/usecases/notes/AddNote";
import { GetNoteById } from "../../domain/usecases/notes/GetNoteById";
import { GetNotes } from "../../domain/usecases/notes/GetNotes";

@injectable()
export class NotesController {
    constructor(
        @inject(AddNote) private addNoteCase: AddNote,
        @inject(GetNotes) private getNotesCase: GetNotes,
        @inject(GetNoteById) private getNoteByIdCase: GetNoteById
    ) { }

    async postNote(req: Request, res: Response) {
        const noteId = await this.addNoteCase.execute(req.body)
        res.status(201).json({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: { noteId }
        })
    }

    async getNotes(req: Request, res: Response) {
        const notes = await this.getNotesCase.execute()
        res.json({
            status: 'success',
            data: { notes }
        })
    }

    async getNoteById(req: Request, res: Response) {
        const { id } = req.params
        const note = await this.getNoteByIdCase.execute(id)
        res.json({
            status: 'success',
            data: { note }
        })
    }
}