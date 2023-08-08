import { inject, injectable } from 'tsyringe';
import { User } from '../../domain/entities/User';
import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { NotesService } from '../services/postgres/NotesService';

@injectable()
export class NoteRepositoryImpl implements NoteRepository {
    constructor(@inject(NotesService) private notesService: NotesService) { }

    async addNote(title: string, body: string, tags: string[]): Promise<number> {
        const noteId = await this.notesService.addNote(title, body, tags)
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
}