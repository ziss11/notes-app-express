import { inject, injectable } from "tsyringe";
import { UserRepositoryImpl } from "../../../data/repositories/UserRepositoryImpl";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";

@injectable()
export class GetUserByUsername {
    constructor(@inject(UserRepositoryImpl) private userRepository: UserRepository) { }

    async execute(username: string): Promise<User[]> {
        return await this.userRepository.getUserByUsername(username)
    }
}