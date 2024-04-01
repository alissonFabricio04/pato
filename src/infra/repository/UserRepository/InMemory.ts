import UserRepository from '../../../application/repository/UserRepository'
import Id from '../../../domain/Id'
import Username from '../../../domain/Name'
import User from '../../../domain/User'
import UserQuery from '../../../application/query/UserQuery'
import Email from '../../../domain/Email'

export class UserRepositoryInMemory implements UserRepository, UserQuery {
  users: User[] = []

  async save(user: User) {
    this.users.push(user)
  }

  async findById(userId: Id) {
    const user = this.users.find(
      (user) => user.userId.getValue() === userId.getValue(),
    )
    return user || null
  }

  async findByUsername(username: Username) {
    const user = this.users.find(
      (user) => user.getUsername() === username.getValue(),
    )
    return user || null
  }

  async findByEmail(email: Email) {
    const user = this.users.find((user) => user.getEmail() === email.getValue())
    return user || null
  }

  async update(user: User) {
    this.users = this.users.filter((u) => {
      if (u.userId.getValue() === user.userId.getValue()) {
        return user
      }
      return u
    })
  }

  async getById(userId: Id) {
    const user = this.users.find(
      (user) => user.userId.getValue() === userId.getValue(),
    )
    if (!user) {
      return null
    }
    return {
      userId: user.userId.getValue(),
      username: user.getUsername(),
      email: user.getEmail(),
      profilePicture: user.getProfilePicture()?.getValue(),
    }
  }
}
