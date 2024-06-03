/* eslint-disable no-useless-escape */

import bcrypt from 'bcrypt'
import { NotImplemented, UnprocessableEntity } from '../../common/error'

export enum ALGORITHMS_SUPPORTED {
  BCRYPT = 'BCRYPT',
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
  algorithm: ALGORITHMS_SUPPORTED
  validate(password: string): Promise<boolean>
}

export class BCRYPTPassword implements Password {
  algorithm: ALGORITHMS_SUPPORTED

  private constructor(readonly value: string) {
    this.algorithm = ALGORITHMS_SUPPORTED.BCRYPT
  }

  static async create(password: string) {
    isAGoodPassword(password)
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return new BCRYPTPassword(hash)
  }

  static restore(password: string) {
    return new BCRYPTPassword(password)
  }

  async validate(password: string) {
    return await bcrypt.compare(password, this.value)
  }
}

export class PasswordFactory {
  static create(algorithm: ALGORITHMS_SUPPORTED) {
    if (algorithm === ALGORITHMS_SUPPORTED.BCRYPT) return BCRYPTPassword
    throw new NotImplemented('Criptografia não conhecida')
  }
}
