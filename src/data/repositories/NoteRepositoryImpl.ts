import { inject, injectable } from 'tsyringe';
import { Note } from '../../domain/entities/Note';
import { NoteBody } from '../../domain/entities/NoteBody';
import { NoteRepository } from '../../domain/repositories/NotesRepository';
import { NotesService } from '../services/postgres/NotesService';

@injectable()
export class NoteRepositoryImpl implements NoteRepository {
    constructor(
        @inject(NotesService) private notesService: NotesService,
    ) { }

    async addNote({ title, body, tags, userId }: NoteBody): Promise<number> {
        const noteId = await this.notesService.addNote({ title, body, tags, userId })
        return noteId
    }

    async getNotes(owner: string): Promise<Note[]> {
        const notes = await this.notesService.getNotes(owner)
        return notes
    }

    async getNoteById(id: string, userId: string): Promise<Note> {
        await this.notesService.verifyNoteAccess(id, userId)

        const note = await this.notesService.getNoteById(id)
        return note
    }

    async editNoteById(id: string, { title, body, tags, userId }: NoteBody) {
        await this.notesService.verifyNoteAccess(id, userId!)
        await this.notesService.editNoteById(id, { title, body, tags })
    }

    async deleteNoteById(id: string, userId: string) {
        await this.notesService.verifyNoteOwner(id, userId)
        await this.notesService.deleteNoteById(id)
    }
}