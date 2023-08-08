import { inject, injectable } from "tsyringe";
import { NoteRepositoryImpl } from "../../../data/repositories/NoteRepositoryImpl";
import { User } from "../../entities/User";
import { NoteRepository } from "../../repositories/NoteRepository";

@injectable()
export class GetNoteById {
    constructor(@inject(NoteRepositoryImpl) private noteRepository: NoteRepository) { }

    async execute(id: string): Promise<User> {
        return await this.noteRepository.getNoteById(id)
    }
}