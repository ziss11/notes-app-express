export interface NoteRepository {
    addNote(title: string, body: string, tags: string[], owner: string): Promise<number>
}