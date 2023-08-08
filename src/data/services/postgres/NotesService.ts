import { Pool } from 'pg'
import shortid from 'shortid'
import { injectable } from 'tsyringe'
import { Note } from '../../../domain/entities/Note'
import { NoteBody } from '../../../domain/entities/NoteBody'
import { InvariantError } from '../../../utils/exceptions/InvariantError'
import { NotFoundError } from '../../../utils/exceptions/NotFoundError'

@injectable()
export class NotesService {
    private pool: Pool

    constructor() {
        this.pool = new Pool()
    }

    async addNote({ title, body, tags }: NoteBody): Promise<number> {
        const id = `note-${shortid.generate()}`
        const createdAt = new Date().toISOString()
        const updatedAt = createdAt

        const query = {
            text: 'INSERT INTO notes VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, title, body, tags, createdAt, updatedAt]
        }

        const result = await this.pool.query(query)
        const noteId: number = result.rows[0].id

        if (!result.rowCount) {
            throw new InvariantError('Catatan gagal ditambahkan')
        }

        return noteId
    }

    async getNotes(): Promise<Note[]> {
        const result = await this.pool.query('SELECT * FROM notes')
        return result.rows.map(Note.fromDB)
    }

    async getNoteById(id: string): Promise<Note> {
        const query = {
            text: `SELECT * FROM notes WHERE notes.id = $1`,
            values: [id]
        }
        const result = await this.pool.query(query)

        if (!result.rows.length) {
            throw new NotFoundError('Catatan tidak ditemukan')
        }

        return result.rows.map(Note.fromDB)[0]
    }

    async editNoteById(id: string, { title, body, tags }: NoteBody) {
        const updatedAt = new Date().toISOString()
        const query = {
            text: 'UPDATE notes SET title=$1, body=$2, tags=$3, updated_at=$4 WHERE id = $5 RETURNING id',
            values: [title, body, tags, updatedAt, id]
        }
        const result = await this.pool.query(query)

        if (!result.rowCount) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan')
        }
    }

    async deleteNoteById(id: string) {
        const query = {
            text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
            values: [id]
        }

        const result = await this.pool.query(query)

        if (!result.rowCount) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan')
        }
    }
}