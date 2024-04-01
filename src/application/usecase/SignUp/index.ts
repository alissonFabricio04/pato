/* eslint-disable no-useless-constructor */

import UserRepository from '../../repository/UserRepository'
import User from '../../../domain/User'
import Username from '../../../domain/Name'
import { isDeepStrictEqual } from 'node:util'
import { BadRequest, Conflict } from '../../../common/error'

type Input = {
  username: string
  email: string
  password: string
  passwordAgain: string
}

type Output = {
  userId: string
  username: string
  email: string
}

export default class SignUp {
  constructor(readonly userRepository: UserRepository) {}

  async handle(input: Input): Promise<Output> {
    if (!isDeepStrictEqual(input.password, input.passwordAgain)) {
      throw new BadRequest('Senhas se diferem')
    }
    const user = User.create(input.username, input.email, input.password)
    const usernameAlreadyInUse = await this.userRepository.findByUsername(
      new Username(user.getUsername()),
    )
    if (usernameAlreadyInUse) throw new Conflict('Username já em uso')
    user.activeAccount()
    await this.userRepository.save(user)
    return {
      userId: user.userId.getValue(),
      username: user.getUsername(),
      email: user.getEmail(),
    }
  }
}
