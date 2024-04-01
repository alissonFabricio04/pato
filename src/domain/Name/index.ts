/* eslint-disable no-useless-escape */

import { UnprocessableEntity } from '../../common/error'

export default class Name {
  private value: string
  private specialCharsPattern = /[!@#$%^&*()#+{}\[\]:;''<>,.?~`|\\\/\-]/

  constructor(name: string) {
    if (!name) throw new UnprocessableEntity('O nome não foi fornecido')
    if (name.length <= 1) {
      throw new UnprocessableEntity('O nome é muito curto')
    }
    if (name.length > 40) {
      throw new UnprocessableEntity('O nome é muito longo')
    }
    if (this.specialCharsPattern.test(name)) {
      throw new UnprocessableEntity(
        'O nome não deve possuir caracteres especias',
      )
    }
    this.value = name
  }

  getValue() {
    return this.value
  }
}
