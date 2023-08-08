import { Pool } from 'pg'
import shortid from 'shortid'
import { injectable } from 'tsyringe'
import { InvariantError } from '../../../utils/exceptions/InvariantError'

@injectable()
export class NotesService {
    private pool: Pool

    constructor() {
        this.pool = new Pool()
    }

    async addNote(title: string, body: string, tags: string[], owner: string): Promise<number> {
        const id = `note-${shortid.generate()}`
        const createdAt = new Date().toISOString()
        const updatedAt = createdAt

        const query = {
            text: 'INSERT INTO notes VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, title, body, tags, createdAt, updatedAt, owner]
        }

        const result = await this.pool.query(query)
        const noteId: number = result.rows[0].id

        if (!result.rowCount) {
            throw new InvariantError('Catatan gagal ditambahkan')
        }

        return noteId
    }
}