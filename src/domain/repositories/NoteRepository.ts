import { User } from "../entities/User"

export interface NoteRepository {
    addNote(title: string, body: string, tags: string[]): Promise<number>
    getNotes(): Promise<User[]>
    getNoteById(id: string): Promise<User>
}