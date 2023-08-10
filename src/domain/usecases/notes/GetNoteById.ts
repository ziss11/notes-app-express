import { inject, injectable } from "tsyringe";
import { NoteRepositoryImpl } from "../../../data/repositories/NoteRepositoryImpl";
import { Note } from "../../entities/Note";
import { NoteRepository } from "../../repositories/NotesRepository";

@injectable()
export class GetNoteById {
    constructor(@inject(NoteRepositoryImpl) private noteRepository: NoteRepository) { }

    async execute(id: string, userId: string): Promise<Note> {
        return await this.noteRepository.getNoteById(id, userId)
    }
}