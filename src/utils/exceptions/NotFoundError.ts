const ClientError = require('./ClientError')

export class NotFoundError extends ClientError {
  constructor(public message: string) {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}