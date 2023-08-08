import { container } from "tsyringe";
import { NoteRepositoryImpl } from "./data/repositories/NoteRepositoryImpl";
import { NotesService } from "./data/services/postgres/NotesService";
import { AddNote } from "./domain/usecases/notes/AddNote";
import { NotesController } from "./presentation/controllers/NotesController";

// services
container.register<NotesService>(NotesService, { useClass: NotesService })

// repositories
container.register<NoteRepositoryImpl>(NoteRepositoryImpl, { useClass: NoteRepositoryImpl })

// usecases
container.register<AddNote>(AddNote, { useClass: AddNote })

// controllers
container.register<NotesController>(NotesController, { useClass: NotesController })
