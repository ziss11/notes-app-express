import { Pool } from 'pg'
import shortid from 'shortid'
import { injectable } from 'tsyringe'
import { User } from '../../../domain/entities/User'
import { InvariantError } from '../../../utils/exceptions/InvariantError'
import { NotFoundError } from '../../../utils/exceptions/NotFoundError'

@injectable()
export class NotesService {
    private pool: Pool

    constructor() {
        this.pool = new Pool()
    }

    async addNote(title: string, body: string, tags: string[]): Promise<number> {
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

    async getNotes() {
        const result = await this.pool.query('SELECT * FROM notes')
        return result.rows.map(User.fromDB)
    }

    async getNoteById(id: string) {
        const query = {
            text: `SELECT * FROM notes WHERE notes.id = $1`,
            values: [id]
        }
        const result = await this.pool.query(query)

        if (!result.rows.length) {
            throw new NotFoundError('Catatan tidak ditemukan')
        }

        return result.rows.map(User.fromDB)[0]
    }
}