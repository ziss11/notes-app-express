import { inject, injectable } from 'tsyringe';
import { NoteBody } from '../../domain/entities/NoteBody';
import { User } from '../../domain/entities/User';
import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { NotesService } from '../services/postgres/NotesService';

@injectable()
export class NoteRepositoryImpl implements NoteRepository {
    constructor(@inject(NotesService) private notesService: NotesService) { }

    async addNote({ title, body, tags }: NoteBody): Promise<number> {
        const noteId = await this.notesService.addNote({ title, body, tags })
        return noteId
    }

    async getNotes(): Promise<User[]> {
        const notes = await this.notesService.getNotes()
        return notes
    }

    async getNoteById(id: string): Promise<User> {
        const note = await this.notesService.getNoteById(id)
        return note
    }

    async editNoteById(id: string, { title, body, tags }: NoteBody) {
        await this.notesService.editNoteById(id, { title, body, tags })
    }

    async deleteNoteById(id: string) {
        await this.notesService.deleteNoteById(id)
    }
}