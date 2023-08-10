export interface CollaborationsRepository {
    addCollaboration(noteId: string, userId: string, owner: string): Promise<number>
    deleteCollaboration(noteId: string, userId: string, owner: string): Promise<void>
}