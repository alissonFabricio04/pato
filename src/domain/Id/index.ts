import { randomUUID } from 'node:crypto'
import { UnprocessableEntity } from '../../common/error'

export default class Id {
  private value: string

  constructor(id: string) {
    if (
      !id ||
      id.length !== 36 ||
      !/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      throw new UnprocessableEntity('O id fornecido não é válido')
    }
    this.value = id
  }

  static create() {
    return new Id(randomUUID())
  }

  getValue(): string {
    return this.value
  }
}
