import { autoInjectable } from "tsyringe";
import { NoteRepositoryImpl } from "../../../data/repositories/NotesRepositoryImpl";
import { NoteBody } from "../../entities/NoteBody";

@autoInjectable()
export class AddNote {
    constructor(private noteRepository: NoteRepositoryImpl) {
        this.noteRepository = noteRepository
    }

    async execute({ title, body, tags, owner }: NoteBody): Promise<number> {
        return await this.noteRepository.addNote(title, body, tags, owner)
    }
}