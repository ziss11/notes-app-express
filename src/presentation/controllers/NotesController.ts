import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { AddNote } from "../../domain/usecases/notes/AddNote";

@autoInjectable()
export class NotesController {
    constructor(private addNote: AddNote) {
        this.addNote = addNote
    }

    async postNote(req: Request, res: Response): Promise<void> {
        const noteId = await this.addNote.execute(req.body)
        res.status(201).json({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            noteId
        })
    }
}