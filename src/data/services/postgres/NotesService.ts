import { Pool } from 'pg'
import shortid from 'shortid'
import { inject, injectable } from 'tsyringe'
import { Note } from '../../../domain/entities/Note'
import { NoteBody } from '../../../domain/entities/NoteBody'
import { AuthorizationError } from '../../../utils/exceptions/AuthorizationError'
import { InvariantError } from '../../../utils/exceptions/InvariantError'
import { NotFoundError } from '../../../utils/exceptions/NotFoundError'
import { CacheService } from '../redis/CacheService'
import { CollaborationsService } from './CollaborationsService'

@injectable()
export class NotesService {
    private pool: Pool

    constructor(
        @inject(CollaborationsService) private collaborationsService: CollaborationsService,
        @inject(CacheService) private cacheService: CacheService,
    ) {
        this.pool = new Pool()
    }

    async verifyNoteOwner(id: string, owner: string) {
        const query = {
            text: 'SELECT * FROM notes WHERE id=$1',
            values: [id]
        }

        const result = await this.pool.query(query)

        if (!result.rowCount) {
            throw new NotFoundError('Catatan tidak ditemukan')
        }

        const note = result.rows[0]

        if (owner !== note.owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini')
        }
    }

    async verifyNoteAccess(noteId: string, userId: string) {
        try {
            await this.verifyNoteOwner(noteId, userId)
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error
            }

            try {
                await this.collaborationsService.verifyCollaborator(noteId, userId)
            } catch {
                throw error
            }
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

        await this.cacheService.delete(`notes:${userId}`)
        return noteId
    }

    async getNotes(owner: string): Promise<Note[]> {
        try {
            const result = await this.cacheService.get(`notes:${owner}`)
            return JSON.parse(result)
        } catch (error) {
            const query = {
                text: `SELECT notes.* FROM notes
                LEFT JOIN collaborations ON collaborations.note_id = notes.id
                WHERE notes.owner = $1 OR collaborations.user_id = $1
                GROUP BY notes.id`,
                values: [owner]
            }
            const result = await this.pool.query(query)
            const mappedResult = result.rows.map(Note.fromDB)

            await this.cacheService.set(`notes:${owner}`, JSON.stringify(mappedResult))
            return mappedResult
        }
    }

    async getNoteById(id: string): Promise<Note> {
        const query = {
            text: `SELECT notes.*, users.username FROM notes 
            LEFT JOIN users on users.id=notes.owner
            WHERE notes.id = $1`,
            values: [id]
        }
        const result = await this.pool.query(query)

        if (!result.rowCount) {
            throw new NotFoundError('Catatan tidak ditemukan')
        }

        return result.rows.map(Note.fromDB)[0]
    }

    async editNoteById(id: string, { title, body, tags }: NoteBody) {
        const updatedAt = new Date().toISOString()
        const query = {
            text: 'UPDATE notes SET title=$1, body=$2, tags=$3, updated_at=$4 WHERE id=$5 RETURNING id, owner',
            values: [title, body, tags, updatedAt, id]
        }
        const result = await this.pool.query(query)

        if (!result.rowCount) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan')
        }

        const { owner } = result.rows[0]
        await this.cacheService.delete(`notes:${owner}`)
    }

    async deleteNoteById(id: string) {
        const query = {
            text: 'DELETE FROM notes WHERE id = $1 RETURNING id, owner',
            values: [id]
        }

        const result = await this.pool.query(query)

        if (!result.rowCount) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan')
        }

        const { owner } = result.rows[0]
        await this.cacheService.delete(`notes:${owner}`)
    }
}