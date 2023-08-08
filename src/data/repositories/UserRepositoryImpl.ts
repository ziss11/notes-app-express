import { inject, injectable } from "tsyringe";
import { User } from "../../domain/entities/User";
import { UserBody } from "../../domain/entities/UserBody";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UsersService } from "../services/postgres/UsersService";

@injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(@inject(UsersService) private usersService: UsersService) { }

    async addUser({ username, password, fullname }: UserBody): Promise<number> {
        await this.usersService.verifyUsername(username)

        const userId = await this.usersService.addUser({ username, password, fullname })
        return userId
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.usersService.getUserById(userId)
        return user
    }

    async getUserByUsername(username: string): Promise<User[]> {
        const users = await this.usersService.getUserByUsername(username)
        return users
    }
}