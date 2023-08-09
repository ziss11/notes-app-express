import { inject, injectable } from "tsyringe";
import { AuithenticationsRepositoryImpl } from "../../../data/repositories/AuthenticationsRepositoryImpl";
import { TokenResponse } from "../../entities/TokenResponse";
import { AuthenticationsRepository } from "../../repositories/AuthenticationsRepository";

@injectable()
export class AddRefreshToken {
    constructor(
        @inject(AuithenticationsRepositoryImpl) private authenticationsRepository: AuthenticationsRepository
    ) { }

    async execute(username: string, password: string): Promise<TokenResponse> {
        return await this.authenticationsRepository.addRefreshToken(username, password)
    }
}