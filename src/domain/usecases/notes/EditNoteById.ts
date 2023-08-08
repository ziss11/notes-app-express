import { inject, injectable } from "tsyringe";
import { NoteRepositoryImpl } from "../../../data/repositories/NoteRepositoryImpl";
import { NoteBody } from "../../entities/NoteBody";
import { NoteRepository } from "../../repositories/NoteRepository";

@injectable()
export class EditNoteById {
    constructor(@inject(NoteRepositoryImpl) private noteRepository: NoteRepository) { }

    async execute(id: string, { title, body, tags }: NoteBody) {
        await this.noteRepository.editNoteById(id, { title, body, tags })
    }
}