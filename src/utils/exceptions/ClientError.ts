export class ClientError extends Error {
  constructor(public message: string, public statusCode: number = 400) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ClientError'
  }
}