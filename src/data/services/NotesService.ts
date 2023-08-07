import { Pool } from 'pg'

export class NotesService {
    private pool: Pool

    constructor() {
        this.pool = new Pool()
    }

    async addNote({ title, body, tags, owner }) { }
}