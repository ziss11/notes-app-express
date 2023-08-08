import { container } from "tsyringe";
import { NoteRepositoryImpl } from "./data/repositories/NoteRepositoryImpl";
import { NotesService } from "./data/services/postgres/NotesService";
import { AddNote } from "./domain/usecases/notes/AddNote";
import { DeleteNoteById } from "./domain/usecases/notes/DeleteNoteById";
import { EditNoteById } from "./domain/usecases/notes/EditNoteById";
import { GetNoteById } from "./domain/usecases/notes/GetNoteById";
import { GetNotes } from "./domain/usecases/notes/GetNotes";
import { NotesController } from "./presentation/controllers/NotesController";

// controllers
container.register<NotesController>(NotesController, { useClass: NotesController })

// usecases
container.register<AddNote>(AddNote, { useClass: AddNote })
container.register<GetNotes>(GetNotes, { useClass: GetNotes })
container.register<GetNoteById>(GetNoteById, { useClass: GetNoteById })
container.register<EditNoteById>(EditNoteById, { useClass: EditNoteById })
container.register<DeleteNoteById>(DeleteNoteById, { useClass: DeleteNoteById })

// repositories
container.register<NoteRepositoryImpl>(NoteRepositoryImpl, { useClass: NoteRepositoryImpl })

// services
container.register<NotesService>(NotesService, { useClass: NotesService })