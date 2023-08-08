import { container } from "tsyringe";
import { NoteRepositoryImpl } from "./data/repositories/NoteRepositoryImpl";
import { NotesService } from "./data/services/postgres/NotesService";
import { AddNote } from "./domain/usecases/notes/AddNote";
import { GetNoteById } from "./domain/usecases/notes/GetNoteById";
import { GetNotes } from "./domain/usecases/notes/GetNotes";
import { NotesController } from "./presentation/controllers/NotesController";

// controllers
container.register<NotesController>(NotesController, { useClass: NotesController })

// usecases
container.register<AddNote>(AddNote, { useClass: AddNote })
container.register<GetNotes>(GetNotes, { useClass: GetNotes })
container.register<GetNoteById>(GetNoteById, { useClass: GetNoteById })

// repositories
container.register<NoteRepositoryImpl>(NoteRepositoryImpl, { useClass: NoteRepositoryImpl })

// services
container.register<NotesService>(NotesService, { useClass: NotesService })