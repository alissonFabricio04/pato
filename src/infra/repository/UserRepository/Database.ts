/* eslint-disable no-useless-constructor */

import { DataSource, Repository } from 'typeorm'
import UserRepository from '../../../application/repository/UserRepository'
import Id from '../../../domain/Id'
import Username from '../../../domain/Name'
import User from '../../../domain/User'
import UserEntity from '../../database/entity/UserEntity'
import { ALGORITHMS_SUPPORTED } from '../../../domain/Password'
import Email from '../../../domain/Email'

export default class UserRepositoryDatabase implements UserRepository {
  private userEntityRepository: Repository<UserEntity>
  private dataSource: DataSource

  constructor(databaseConnection: DataSource) {
    this.userEntityRepository = databaseConnection.getRepository(UserEntity)
    this.dataSource = databaseConnection
  }

  async save(user: User) {
    const userEntity = new UserEntity()
    userEntity.id = user.userId.getValue()
    userEntity.username = user.getUsername()
    userEntity.email = user.getEmail()
    userEntity.password = `${user.getPassword().value}!!${user.getPassword().salt}!!${user.getPassword().algorithm}`
    const profilePicture = user.getProfilePicture()
    if (profilePicture) {
      userEntity.profilePictureUri = profilePicture.getValue()
      userEntity.profilePictureMediaType = profilePicture.getMediaType()
    }
    await this.userEntityRepository.save(userEntity)
  }

  async findById(userId: Id) {
    const userEntity = await this.userEntityRepository.findOneBy({
      id: userId.getValue(),
    })
    if (!userEntity) return null
    const [password, salt, algorithm] = userEntity.password.split('!!')
    let profilePic: { uri: string; mediaType: string } | undefined
    if (userEntity.profilePictureUri) {
      profilePic = {
        uri: userEntity.profilePictureUri,
        mediaType: userEntity.profilePictureMediaType,
      }
    }
    return User.restore(
      userEntity.id,
      userEntity.username,
      userEntity.email,
      password,
      algorithm as ALGORITHMS_SUPPORTED,
      salt,
      !userEntity.deletedAt,
      profilePic,
    )
  }

  async findByUsername(username: Username) {
    const userEntity = await this.userEntityRepository.findOneBy({
      username: username.getValue(),
    })
    if (!userEntity) return null
    const [password, salt, algorithm] = userEntity.password.split('!!')
    let profilePic: { uri: string; mediaType: string } | undefined
    if (userEntity.profilePictureUri) {
      profilePic = {
        uri: userEntity.profilePictureUri,
        mediaType: userEntity.profilePictureMediaType,
      }
    }
    return User.restore(
      userEntity.id,
      userEntity.username,
      userEntity.email,
      password,
      algorithm as ALGORITHMS_SUPPORTED,
      salt,
      !userEntity.deletedAt,
      profilePic,
    )
  }

  async findByEmail(email: Email) {
    const userEntity = await this.userEntityRepository.findOneBy({
      email: email.getValue(),
    })
    if (!userEntity) return null
    const [password, salt, algorithm] = userEntity.password.split('!!')
    let profilePic: { uri: string; mediaType: string } | undefined
    if (userEntity.profilePictureUri) {
      profilePic = {
        uri: userEntity.profilePictureUri,
        mediaType: userEntity.profilePictureMediaType,
      }
    }
    return User.restore(
      userEntity.id,
      userEntity.username,
      userEntity.email,
      password,
      algorithm as ALGORITHMS_SUPPORTED,
      salt,
      !userEntity.deletedAt,
      profilePic,
    )
  }

  async update(user: User) {
    await this.dataSource
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        username: user.getUsername(),
        email: user.getEmail(),
        password: `${user.getPassword().value}!!${user.getPassword().salt}!!${user.getPassword().algorithm}`,
        profilePictureUri: user.getProfilePicture()?.getValue(),
        profilePictureMediaType: user.getProfilePicture()?.getMediaType(),
        deletedAt: !user.getIsActive() ? new Date() : null,
      })
      .where('id = :id', { id: user.userId.getValue() })
      .execute()
  }
}
