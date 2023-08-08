import { inject, injectable } from "tsyringe";
import { NoteRepositoryImpl } from "../../../data/repositories/NoteRepositoryImpl";
import { Note } from "../../entities/Note";
import { NoteRepository } from "../../repositories/NotesRepository";

@injectable()
export class GetNotes {
    constructor(@inject(NoteRepositoryImpl) private noteRepository: NoteRepository) { }

    async execute(): Promise<Note[]> {
        return await this.noteRepository.getNotes()
    }
}