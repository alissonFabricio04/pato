/* eslint-disable no-useless-escape */

import crypto from 'node:crypto'
import { NotImplemented, UnprocessableEntity } from '../../common/error'

export enum ALGORITHMS_SUPPORTED {
  PBKDF2 = 'PBKDF2',
}

function isAGoodPassword(password: string): boolean {
  if (!password) throw new UnprocessableEntity('Senha inválida')
  if (password.length < 8) throw new UnprocessableEntity('Senha muito curta')
  if (password.length > 100) throw new UnprocessableEntity('Senha muito longa')

  const regexUpperCase = /[A-Z]/
  if (!regexUpperCase.test(password)) {
    throw new UnprocessableEntity(
      'A senha deve possuir pelo menos uma letra maiúscula',
    )
  }

  const regexLowerCase = /[a-z]/
  if (!regexLowerCase.test(password)) {
    throw new UnprocessableEntity(
      'A senha deve possuir pelo menos uma letra minúscula',
    )
  }

  const regexNumber = /[0-9]/
  if (!regexNumber.test(password)) {
    throw new UnprocessableEntity('A senha deve possuir pelo menos um número')
  }

  const regexSpecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/
  if (!regexSpecial.test(password)) {
    throw new UnprocessableEntity(
      'A senha deve possuir pelo menos um caractere especial',
    )
  }

  return true
}

export default interface Password {
  value: string
  salt: string
  algorithm: ALGORITHMS_SUPPORTED
  validate(password: string): boolean
}

export class PBKDF2Password implements Password {
  algorithm: ALGORITHMS_SUPPORTED

  private constructor(
    readonly value: string,
    readonly salt: string,
  ) {
    this.algorithm = ALGORITHMS_SUPPORTED.PBKDF2
  }

  static create(password: string) {
    isAGoodPassword(password)
    const salt = crypto.randomBytes(20).toString('hex')
    const value = crypto
      .pbkdf2Sync(password, salt, 100, 64, 'sha512')
      .toString('hex')
    return new PBKDF2Password(value, salt)
  }

  static restore(password: string, salt: string) {
    return new PBKDF2Password(password, salt)
  }

  validate(password: string): boolean {
    const value = crypto
      .pbkdf2Sync(password, this.salt, 100, 64, 'sha512')
      .toString('hex')
    return this.value === value
  }
}

export class PasswordFactory {
  static create(algorithm: ALGORITHMS_SUPPORTED) {
    if (algorithm === ALGORITHMS_SUPPORTED.PBKDF2) return PBKDF2Password
    throw new NotImplemented('Criptografia não conhecida')
  }
}
