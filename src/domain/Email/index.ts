/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-escape */

import { BadRequest } from '../../common/error'

export default class Email {
  private value: string

  constructor(email: string) {
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    ;/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!regexEmail.test(email)) {
      throw new BadRequest('Endereço de e-mail invalido')
    }
    this.value = email
  }

  getValue() {
    return this.value
  }
}
