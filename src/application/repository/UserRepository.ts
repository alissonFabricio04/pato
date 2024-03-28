import Id from '../../domain/Id'
import Username from '../../domain/Username'
import User from '../../domain/User'

export default interface UserRepository {
  save: (user: User) => Promise<void>
  findById: (userId: Id) => Promise<User | null>
  findByUsername: (username: Username) => Promise<User | null>
  update: (user: User) => Promise<void>
}
