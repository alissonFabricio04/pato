/* eslint-disable no-useless-constructor */

import Username from '../../../domain/Name'
import { BadRequest, NotFound } from '../../../common/error'
import JwtAdapter from '../../adapter/JwtAdapter'
import UserRepository from '../../repository/UserRepository'

type Input = {
  username: string
  password: string
}

type Output = {
  token: string
}

export default class SignIn {
  constructor(
    readonly userRepository: UserRepository,
    readonly jwtAdapter: JwtAdapter,
  ) {}

  async handle(input: Input): Promise<Output> {
    const userExists = await this.userRepository.findByUsername(
      new Username(input.username),
    )
    if (!userExists) throw new NotFound('Username ou senha inválidos')
    const passwordsIsEqual = await userExists
      .getPassword()
      .validate(input.password)
    if (!passwordsIsEqual) throw new BadRequest('Senha ou username incorreto')
    const userId = userExists.userId
    const token = this.jwtAdapter.sign({ userId: userId.getValue() })
    return {
      token,
    }
  }
}
