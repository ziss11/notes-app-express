import { inject, injectable } from 'tsyringe';
import { Note } from '../../domain/entities/Note';
import { NoteBody } from '../../domain/entities/NoteBody';
import { NoteRepository } from '../../domain/repositories/NotesRepository';
import { NotesService } from '../services/postgres/NotesService';
import { ProducerService } from '../services/rabbitmq/ProducerService';

@injectable()
export default class NoteRepositoryImpl implements NoteRepository {
    constructor(
        @inject(NotesService) private notesService: NotesService,
        @inject(ProducerService) private producerService: ProducerService,
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

    async exportNotes(userId: string, targetEmail: string): Promise<void> {
        const message = {
            userId,
            targetEmail
        }

        await this.producerService.sendMessage('export:notes', JSON.stringify(message))
    }
}