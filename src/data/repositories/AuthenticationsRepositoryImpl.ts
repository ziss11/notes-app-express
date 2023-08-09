import { inject, injectable } from "tsyringe";
import { TokenResponse } from "../../domain/entities/TokenResponse";
import { AuthenticationsRepository } from "../../domain/repositories/AuthenticationsRepository";
import { TokenManager } from "../../utils/tokenize/TokenManager";
import { AuthenticationsService } from "../services/postgres/AuthenticationsService";
import { UsersService } from "../services/postgres/UsersService";

@injectable()
export class AuithenticationsRepositoryImpl implements AuthenticationsRepository {
    constructor(
        @inject(AuthenticationsService) private authenticationsService: AuthenticationsService,
        @inject(UsersService) private usersService: UsersService,
        @inject(TokenManager) private tokenManager: TokenManager,
    ) { }

    async addRefreshToken(username: string, password: string): Promise<TokenResponse> {
        const id = await this.usersService.verifyUserCredential(username, password)

        const accessToken = this.tokenManager.generateAccessToken({ id })
        const refreshToken = this.tokenManager.generateRefreshToken({ id })

        await this.authenticationsService.addRefreshToken(refreshToken)
        const tokens = new TokenResponse(accessToken, refreshToken)

        return tokens
    }

    async refreshAccessToken(refreshToken: string): Promise<string> {
        await this.authenticationsService.verifyRefreshToken(refreshToken)
        const id = this.tokenManager.verifyRefreshToken(refreshToken)
        const accessToken = this.tokenManager.generateAccessToken({ id })

        return accessToken
    }

    async deleteRefreshToken(refreshToken: string) {
        await this.authenticationsService.verifyRefreshToken(refreshToken)
        await this.authenticationsService.deleteRefreshToken(refreshToken)
    }
}