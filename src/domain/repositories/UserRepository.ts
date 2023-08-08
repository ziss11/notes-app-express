import { User } from "../entities/User"
import { UserBody } from "../entities/UserBody"

export interface UserRepository {
    addUser({ username, password, fullname }: UserBody): Promise<number>
    getUserById(userId: string): Promise<User>
    getUserByUsername(username: string): Promise<User[]>
}