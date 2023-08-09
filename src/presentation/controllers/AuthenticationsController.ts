import autobind from "autobind-decorator";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { AddRefreshToken } from "../../domain/usecases/authentications/AddRefreshToken";
import { DeleteRefreshToken } from "../../domain/usecases/authentications/DeleteRefreshToken";
import { RefreshAccessToken } from "../../domain/usecases/authentications/RefreshAccessToken";

@injectable()
export class AuthenticationsController {
    constructor(
        @inject(AddRefreshToken) private addRefreshTokenCase: AddRefreshToken,
        @inject(RefreshAccessToken) private refreshAccessTokenCase: RefreshAccessToken,
        @inject(DeleteRefreshToken) private deleteRefreshTokenCase: DeleteRefreshToken,
    ) { }

    @autobind
    async postAuthentication(req: Request, res: Response) {
        const { username, password }: { username: string, password: string } = req.body
        const data = await this.addRefreshTokenCase.execute(username, password)
        res.status(201).json({
            status: 'success',
            message: 'Authentication berhasil ditambahkan',
            data
        })
    }

    @autobind
    async putAuthentication(req: Request, res: Response) {
        const { refreshToken }: { refreshToken: string } = req.body
        const accessToken = await this.refreshAccessTokenCase.execute(refreshToken)
        res.json({
            status: 'success',
            message: 'Access token berhasil diperbarui',
            data: { accessToken }
        })
    }

    @autobind
    async deleteAuthentication(req: Request, res: Response) {
        const { refreshToken }: { refreshToken: string } = req.body
        await this.deleteRefreshTokenCase.execute(refreshToken)
        res.json({
            status: 'success',
            message: 'Refresh token berhasil dihapus',
        })
    }
}