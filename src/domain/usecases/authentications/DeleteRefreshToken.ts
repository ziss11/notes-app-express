import { inject, injectable } from "tsyringe";
import { AuithenticationsRepositoryImpl } from "../../../data/repositories/AuthenticationsRepositoryImpl";
import { AuthenticationsRepository } from "../../repositories/AuthenticationsRepository";

@injectable()
export class DeleteRefreshToken {
    constructor(
        @inject(AuithenticationsRepositoryImpl) private authenticationsRepository: AuthenticationsRepository
    ) { }

    async execute(refreshToken: string) {
        await this.authenticationsRepository.deleteRefreshToken(refreshToken)
    }
}