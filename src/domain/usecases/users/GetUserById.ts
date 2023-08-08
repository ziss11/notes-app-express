import { inject, injectable } from "tsyringe";
import { UserRepositoryImpl } from "../../../data/repositories/UserRepositoryImpl";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";

@injectable()
export class GetUserById {
    constructor(@inject(UserRepositoryImpl) private userRepository: UserRepository) { }

    async execute(id: string): Promise<User> {
        return await this.userRepository.getUserById(id)
    }
}