import { inject, injectable } from "tsyringe";
import { CollaborationsRepositoryImpl } from "../../../data/repositories/CollaborationsRepositoryImpl";
import { CollaborationsRepository } from "../../repositories/CollaborationsRepository";

@injectable()
export class AddCollaboration {
    constructor(
        @inject(CollaborationsRepositoryImpl) private collaborationRepository: CollaborationsRepository,
    ) { }

    async execute(noteId: string, userId: string, owner: string): Promise<number> {
        return await this.collaborationRepository.addCollaboration(noteId, userId, owner)
    }
}