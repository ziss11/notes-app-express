import { NoteBody } from "../entities/NoteBody"
import { User } from "../entities/User"

export interface NoteRepository {
    addNote({ title, body, tags }: NoteBody): Promise<number>
    getNotes(): Promise<User[]>
    getNoteById(id: string): Promise<User>
    editNoteById(id: string, { title, body, tags }: NoteBody): void
    deleteNoteById(id: string): void
}