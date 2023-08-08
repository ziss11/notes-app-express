import { inject, injectable } from "tsyringe";
import { UserRepositoryImpl } from "../../../data/repositories/UserRepositoryImpl";
import { UserBody } from "../../entities/UserBody";
import { UserRepository } from "../../repositories/UserRepository";

@injectable()
export class AddUser {
    constructor(@inject(UserRepositoryImpl) private userRepository: UserRepository) { }

    async execute({ username, password, fullname }: UserBody): Promise<number> {
        return await this.userRepository.addUser({ username, password, fullname })
    }
}