import { inject, injectable } from "tsyringe";
import { AuithenticationsRepositoryImpl } from "../../../data/repositories/AuthenticationsRepositoryImpl";
import { AuthenticationsRepository } from "../../repositories/AuthenticationsRepository";

@injectable()
export class RefreshAccessToken {
    constructor(
        @inject(AuithenticationsRepositoryImpl) private authenticationsRepository: AuthenticationsRepository
    ) { }

    async execute(refreshToken: string): Promise<string> {
        return await this.authenticationsRepository.refreshAccessToken(refreshToken)
    }
}