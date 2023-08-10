import { inject, injectable } from "tsyringe";
import NoteRepositoryImpl from "../../../data/repositories/NoteRepositoryImpl";
import { NoteRepository } from "../../repositories/NotesRepository";

@injectable()
export class ExportNotes {
    constructor(@inject(NoteRepositoryImpl) private noteRepository: NoteRepository) { }

    async execute(userId: string, targetEmail: string) {
        await this.noteRepository.exportNotes(userId, targetEmail)
    }
}