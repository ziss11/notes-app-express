export abstract class NoteRepository {
    abstract addNote(title: string, body: string, tags: string[], owner: string): Promise<number>
}