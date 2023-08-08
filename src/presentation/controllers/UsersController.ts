import autobind from "autobind-decorator";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { AddUser } from "../../domain/usecases/users/AddUser";
import { GetUserById } from "../../domain/usecases/users/GetUserById";
import { GetUserByUsername } from "../../domain/usecases/users/GetUserByUsername";

@injectable()
export class UsersController {
    constructor(
        @inject(AddUser) private addUserCase: AddUser,
        @inject(GetUserById) private getUserByIdCase: GetUserById,
        @inject(GetUserByUsername) private getUserByUsernameCase: GetUserByUsername,
    ) { }

    @autobind
    async postUser(req: Request, res: Response, next: NextFunction) {
        const userId = await this.addUserCase.execute(req.body)
        res.status(201).json({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: { userId }
        })
    }

    @autobind
    async getUserById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const user = await this.getUserByIdCase.execute(id)
        res.json({
            status: 'success',
            data: { user }
        })
    }

    @autobind
    async getUserByUsername(req: Request, res: Response, next: NextFunction) {
        const username: string = req.query.username as string
        const users = await this.getUserByUsernameCase.execute(username)
        res.json({
            status: 'success',
            data: { users }
        })
    }
}