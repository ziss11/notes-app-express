import { ClientError } from "./ClientError"

export class InvariantError extends ClientError {
  constructor(public message: string) {
    super(message)
    this.name = 'InvariantError'
  }
}