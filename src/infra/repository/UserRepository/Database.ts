/* eslint-disable no-useless-constructor */

import Id from '../../../domain/Id'
import User from '../../../domain/User'
import Email from '../../../domain/Email'
import Username from '../../../domain/Name'
import UserQuery from '../../../application/query/UserQuery'
import UserRepository from '../../../application/repository/UserRepository'
import { ConnectionDatabaseType } from '../../database/Connection'

export default class UserRepositoryDatabase
  implements UserRepository, UserQuery
{
  constructor(readonly databaseConnection: ConnectionDatabaseType) {}

  async save(user: User): Promise<void> {
    await this.databaseConnection.user.create({
      data: {
        id: user.userId.getValue(),
        username: user.getUsername(),
        email: user.getEmail(),
        password: user.getPassword().value,
        profile_picture_uri: user.getProfilePicture()?.getValue(),
      },
    })
  }

  async findById(userId: Id): Promise<User | null> {
    const userDatabase = await this.databaseConnection.user.findUnique({
      where: {
        id: userId.getValue(),
      },
    })

    if (!userDatabase) return null
    return User.restore(
      userDatabase.id,
      userDatabase.username,
      userDatabase.email,
      userDatabase.password,
      !userDatabase.deleted_at,
      userDatabase.profile_picture_uri ?? undefined,
    )
  }

  async findByUsername(username: Username): Promise<User | null> {
    const userDatabase = await this.databaseConnection.user.findUnique({
      where: {
        username: username.getValue(),
      },
    })

    if (!userDatabase) return null
    return User.restore(
      userDatabase.id,
      userDatabase.username,
      userDatabase.email,
      userDatabase.password,
      !userDatabase.deleted_at,
      userDatabase.profile_picture_uri ?? undefined,
    )
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userDatabase = await this.databaseConnection.user.findUnique({
      where: {
        email: email.getValue(),
      },
    })

    if (!userDatabase) return null
    return User.restore(
      userDatabase.id,
      userDatabase.username,
      userDatabase.email,
      userDatabase.password,
      !userDatabase.deleted_at,
      userDatabase.profile_picture_uri ?? undefined,
    )
  }

  async update(user: User): Promise<void> {
    await this.databaseConnection.user.update({
      where: {
        id: user.userId.getValue(),
      },
      data: {
        username: user.getUsername(),
        email: user.getEmail(),
        password: user.getPassword().value,
        profile_picture_uri: user.getProfilePicture()?.getValue(),
      },
    })
  }

  async getById(userId: Id): Promise<{
    userId: string
    username: string
    email: string
    profilePicture?: string | undefined
  } | null> {
    const userDatabase = await this.databaseConnection.user.findUnique({
      where: {
        id: userId.getValue(),
      },
    })

    if (!userDatabase) return null
    return {
      userId: userDatabase.id,
      username: userDatabase.username,
      email: userDatabase.email,
      profilePicture: userDatabase.profile_picture_uri ?? undefined,
    }
  }
}
