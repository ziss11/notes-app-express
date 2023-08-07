const ClientError = require('./ClientError')

export class InvariantError extends ClientError {
  constructor(public message: string) {
    super(message)
    this.name = 'InvariantError'
  }
}