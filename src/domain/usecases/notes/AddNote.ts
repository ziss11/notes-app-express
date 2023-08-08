import { inject, injectable } from "tsyringe";
import { NoteRepositoryImpl } from "../../../data/repositories/NoteRepositoryImpl";
import { NoteBody } from "../../entities/NoteBody";
import { NoteRepository } from "../../repositories/NotesRepository";

@injectable()
export class AddNote {
    constructor(@inject(NoteRepositoryImpl) private noteRepository: NoteRepository) { }

    async execute({ title, body, tags }: NoteBody): Promise<number> {
        return await this.noteRepository.addNote({ title, body, tags })
    }
}