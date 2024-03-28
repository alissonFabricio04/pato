/* eslint-disable no-useless-constructor */

import Id from '../../../domain/Id'
import { NotFound } from '../../../common/error'
import UserQuery from '../../query/UserQuery'

type Input = {
  userId: string
}

type Output = {
  userId: string
  username: string
  email: string
  profilePicture?: string
}

export default class GetUser {
  constructor(readonly userQuery: UserQuery) {}

  async handle(input: Input): Promise<Output> {
    const userExists = await this.userQuery.getById(new Id(input.userId))
    if (!userExists) throw new NotFound('Usuário não encontrado')
    return userExists
  }
}
