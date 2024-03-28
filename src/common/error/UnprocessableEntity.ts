export class UnprocessableEntity extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnprocessableEntity'
    Object.setPrototypeOf(this, UnprocessableEntity.prototype)
  }
}
