import { ClientError } from "./ClientError"

export class AuthenticationError extends ClientError {
  constructor(public message: string) {
    super(message, 401)
    this.name = 'AuthenticationError'
  }
}