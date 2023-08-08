import { Note } from "../entities/Note"
import { NoteBody } from "../entities/NoteBody"

export interface NoteRepository {
    addNote({ title, body, tags }: NoteBody): Promise<number>
    getNotes(): Promise<Note[]>
    getNoteById(id: string): Promise<Note>
    editNoteById(id: string, { title, body, tags }: NoteBody): void
    deleteNoteById(id: string): void
}