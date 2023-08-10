import { inject, injectable } from "tsyringe";
import { CollaborationsRepositoryImpl } from "../../../data/repositories/CollaborationsRepositoryImpl";
import { CollaborationsRepository } from "../../repositories/CollaborationsRepository";

@injectable()
export class DeleteCollaboration {
    constructor(
        @inject(CollaborationsRepositoryImpl) private collaborationRepository: CollaborationsRepository,
    ) { }

    async execute(noteId: string, userId: string, owner: string): Promise<void> {
        await this.collaborationRepository.deleteCollaboration(noteId, userId, owner)
    }
}