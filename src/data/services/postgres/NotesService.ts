import { Pool } from 'pg'
import shortid from 'shortid'
import { injectable } from 'tsyringe'
import { Note } from '../../../domain/entities/Note'
import { NoteBody } from '../../../domain/entities/NoteBody'
import { AuthorizationError } from '../../../utils/exceptions/AuthorizationError'
import { InvariantError } from '../../../utils/exceptions/InvariantError'
import { NotFoundError } from '../../../utils/exceptions/NotFoundError'

@injectable()
export class NotesService {
    private pool: Pool

    constructor() {
        this.pool = new Pool()
    }

    async verifyNoteOwner(id: string, owner: string) {
        const query = {
            text: 'SELECT * FROM notes WHERE id=$1',
            values: [id]
        }

        const result = await this.pool.query(query)

        if (!result.rows.length) {
            throw new NotFoundError('Catatan tidak ditemukan')
        }

        const note = result.rows[0]

        if (owner !== note.owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini')
        }
    }

    async addNote({ title, body, tags, userId }: NoteBody): Promise<number> {
        const id = `note-${shortid.generate()}`
        const createdAt = new Date().toISOString()
        const updatedAt = createdAt

        const query = {
            text: 'INSERT INTO notes VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, title, body, tags, createdAt, updatedAt, userId]
        }

        const result = await this.pool.query(query)
        const noteId: number = result.rows[0].id

        if (!result.rowCount) {
            throw new InvariantError('Catatan gagal ditambahkan')
        }

        return noteId
    }

    async getNotes(owner: string): Promise<Note[]> {
        const query = {
            text: 'SELECT * FROM notes WHERE owner=$1',
            values: [owner]
        }
        const result = await this.pool.query(query)
        return result.rows.map(Note.fromDB)
    }

    async getNoteById(id: string): Promise<Note> {
        const query = {
            text: `SELECT notes.*, users.username FROM notes 
            LEFT JOIN users on users.id=notes.owner
            WHERE notes.id = $1`,
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