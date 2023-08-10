import jwt, { JwtPayload } from 'jsonwebtoken'
import { injectable } from 'tsyringe'
import { InvariantError } from '../exceptions/InvariantError'

@injectable()
export class TokenManager {
    generateAccessToken(payload: object): string {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY as string, {
            expiresIn: Number(process.env.ACCESS_TOKEN_AGE)
        })
    }

    generateRefreshToken(payload: object): string {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY as string)
    }

    verifyRefreshToken(refreshToken: string): string {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY as string) as JwtPayload
            return payload.id
        } catch (error) {
            throw new InvariantError('Refresh token tidak valid')
        }
    }
}