import { TokenResponse } from "../entities/TokenResponse"

export interface AuthenticationsRepository {
    addRefreshToken(username: string, password: string): Promise<TokenResponse>
    refreshAccessToken(refreshToken: string): Promise<string>
    deleteRefreshToken(refreshToken: string): Promise<void>
}