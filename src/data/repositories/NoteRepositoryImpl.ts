import { inject, injectable } from 'tsyringe';
import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { NotesService } from '../services/postgres/NotesService';

@injectable()
export class NoteRepositoryImpl implements NoteRepository {
    constructor(@inject(NotesService) private notesService: NotesService) {
        this.notesService = notesService
    }
    async addNote(title: string, body: string, tags: string[], owner: string): Promise<number> {
        const noteId = await this.notesService.addNote(title, body, tags, owner)
        return noteId
    }
}