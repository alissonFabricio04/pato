/* eslint-disable no-useless-escape */

import { UnprocessableEntity } from '../../common/error'

export default class Username {
  private value: string
  private specialCharsPattern = /[!@#$%^&*()#+{}\[\]:;''<>,.?~`|\\\/\-]/

  constructor(username: string) {
    if (!username) throw new UnprocessableEntity('Username não foi fornecido')
    if (username.length <= 1) {
      throw new UnprocessableEntity('Username muito curto')
    }
    if (username.length > 40) {
      throw new UnprocessableEntity('Username muito longo')
    }
    if (this.specialCharsPattern.test(username)) {
      throw new UnprocessableEntity(
        'Username não deve possuir caracteres especias',
      )
    }
    this.value = username
  }

  getValue() {
    return this.value
  }
}
