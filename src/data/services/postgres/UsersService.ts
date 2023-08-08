import bcrypt from "bcrypt"
import { Pool } from "pg"
import shortid from "shortid"
import { injectable } from "tsyringe"
import { User } from "../../../domain/entities/User"
import { UserBody } from "../../../domain/entities/UserBody"
import { InvariantError } from "../../../utils/exceptions/InvariantError"
import { NotFoundError } from "../../../utils/exceptions/NotFoundError"

@injectable()
export class UsersService {
    private pool: Pool

    constructor() {
        this.pool = new Pool()
    }

    async verifyUsername(username: string) {
        const query = {
            text: 'SELECT username FROM users WHERE username = $1',
            values: [username]
        }

        const result = await this.pool.query(query)

        if (result.rowCount > 0) {
            throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.')
        }
    }

    async addUser({ username, password, fullname }: UserBody): Promise<number> {
        const id = `user-${shortid.generate()}`
        const hashedPassword = await bcrypt.hash(password, 10)

        const query = {
            text: 'INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING id',
            values: [id, username, hashedPassword, fullname]
        }

        const result = await this.pool.query(query)

        if (!result.rowCount) {
            throw new InvariantError('User gagal ditambahkan')
        }

        return result.rows[0].id
    }

    async getUserById(userId: string): Promise<User> {
        const query = {
            text: 'SELECT id,username,fullname FROM users WHERE id=$1',
            values: [userId]
        }

        const result = await this.pool.query(query)

        if (!result.rowCount) {
            throw new NotFoundError('User tidak ditemukan')
        }

        return result.rows.map(User.fromDB)[0]
    }

    async getUserByUsername(username: string): Promise<User[]> {
        const query = {
            text: 'SELECT id,username,fullname FROM users WHERE username LIKE $1',
            values: [`%${username}%`]
        }

        const result = await this.pool.query(query)
        return result.rows.map(User.fromDB)
    }
}