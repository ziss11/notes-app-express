import { inject, injectable } from "tsyringe";
import { NoteRepositoryImpl } from "../../../data/repositories/NoteRepositoryImpl";
import { NoteRepository } from "../../repositories/NotesRepository";

@injectable()
export class DeleteNoteById {
    constructor(@inject(NoteRepositoryImpl) private noteRepository: NoteRepository) { }

    async execute(id: string) {
        await this.noteRepository.deleteNoteById(id)
    }
}