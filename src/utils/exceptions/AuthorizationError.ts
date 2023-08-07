import { ClientError } from "./ClientError"

export class AuthorizationError extends ClientError {
  constructor(public message: string) {
    super(message, 403)
    this.name = 'AuthorizationError'
  }
}