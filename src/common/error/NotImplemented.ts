export class NotImplemented extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotImplemented'
    Object.setPrototypeOf(this, NotImplemented.prototype)
  }
}
