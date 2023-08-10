import { Pool } from "pg";
import shortid from "shortid";
import { inject, injectable } from "tsyringe";
import { InvariantError } from "../../../utils/exceptions/InvariantError";
import { CacheService } from "../redis/CacheService";

@injectable()

export class CollaborationsService {
    private pool: Pool

    constructor(@inject(CacheService) private cacheService: CacheService) {
        this.pool = new Pool()
    }

    async verifyCollaborator(noteId: string, userId: string) {
        const query = {
            text: 'SELECT * FROM collaborations WHERE note_id=$1 AND user_id=$2',
            values: [noteId, userId]
        }

        const result = await this.pool.query(query)

        if (!result.rowCount) {
            throw new InvariantError('Kolaborasi gagal diverifikasi')
        }
    }

    async addCollaboration(noteId: string, userId: string) {
        const id = `collab-${shortid.generate()}`

        const query = {
            text: 'INSERT INTO collaborations VALUES ($1, $2, $3) RETURNING id',
            values: [id, noteId, userId]
        }

        const result = await this.pool.query(query)

        if (!result.rowCount) {
            throw new InvariantError('Kolaborasi gagal ditambahkan')
        }

        await this.cacheService.delete(`notes:${userId}`)
        return result.rows[0].id
    }

    async deleteCollaboration(noteId: string, userId: string) {
        const query = {
            text: 'DELETE FROM collaborations WHERE note_id = $1 AND user_id = $2 RETURNING id',
            values: [noteId, userId]
        }

        const result = await this.pool.query(query)

        if (!result.rowCount) {
            throw new InvariantError('Kolaborasi gagal dihapus')
        }

        await this.cacheService.delete(`notes:${userId}`)
    }
}