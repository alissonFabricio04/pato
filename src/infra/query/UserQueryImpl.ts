import { DataSource, Repository } from 'typeorm'
import UserEntity from '../database/entity/UserEntity'
import UserQuery from '../../application/query/UserQuery'
import Id from '../../domain/Id'

export default class UserQueryImpl implements UserQuery {
  private userEntityRepository: Repository<UserEntity>

  constructor(databaseConnection: DataSource) {
    this.userEntityRepository = databaseConnection.getRepository(UserEntity)
  }

  async getById(userId: Id) {
    const userEntity = await this.userEntityRepository.findOneBy({
      id: userId.getValue(),
    })
    if (!userEntity) return null
    return {
      userId: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
      profilePicture: userEntity.profilePictureUri,
    }
  }
}
