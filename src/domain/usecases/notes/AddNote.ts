import { inject, injectable } from "tsyringe";
import { NoteRepositoryImpl } from "../../../data/repositories/NoteRepositoryImpl";
import { NoteBody } from "../../entities/NoteBody";
import { NoteRepository } from "../../repositories/NoteRepository";

@injectable()
export class AddNote {
    constructor(@inject(NoteRepositoryImpl) private noteRepository: NoteRepository) {
        this.noteRepository = noteRepository
    }

    async execute({ title, body, tags, owner }: NoteBody): Promise<number> {
        return await this.noteRepository.addNote(title, body, tags, owner)
    }
}