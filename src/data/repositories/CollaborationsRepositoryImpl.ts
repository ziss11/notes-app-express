import { inject, injectable } from "tsyringe";
import { CollaborationsRepository } from "../../domain/repositories/CollaborationsRepository";
import { CollaborationsService } from "../services/postgres/CollaborationsService";
import { NotesService } from "../services/postgres/NotesService";

@injectable()
export class CollaborationsRepositoryImpl implements CollaborationsRepository {
    constructor(
        @inject(CollaborationsService) private collaborationsService: CollaborationsService,
        @inject(NotesService) private notesService: NotesService,
    ) { }

    async addCollaboration(noteId: string, userId: string, owner: string): Promise<number> {
        await this.notesService.verifyNoteOwner(noteId, owner)
        const collaborationId = await this.collaborationsService.addCollaboration(noteId, userId)
        return collaborationId
    }

    async deleteCollaboration(noteId: string, userId: string, owner: string): Promise<void> {
        await this.notesService.verifyNoteOwner(noteId, owner)
        await this.collaborationsService.deleteCollaboration(noteId, userId)
    }
}