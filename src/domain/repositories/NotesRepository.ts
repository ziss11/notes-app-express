import { Note } from "../entities/Note"
import { NoteBody } from "../entities/NoteBody"

export interface NoteRepository {
    addNote({ title, body, tags, userId }: NoteBody): Promise<number>
    getNotes(owner: string): Promise<Note[]>
    getNoteById(id: string, userId: string): Promise<Note>
    editNoteById(id: string, { title, body, tags, userId }: NoteBody): Promise<void>
    deleteNoteById(id: string, userId: string): Promise<void>
}