import { inject, injectable } from "tsyringe";
import { NoteRepositoryImpl } from "../../../data/repositories/NoteRepositoryImpl";
import { User } from "../../entities/User";
import { NoteRepository } from "../../repositories/NoteRepository";

@injectable()
export class GetNotes {
    constructor(@inject(NoteRepositoryImpl) private noteRepository: NoteRepository) { }

    async execute(): Promise<User[]> {
        return await this.noteRepository.getNotes()
    }
}