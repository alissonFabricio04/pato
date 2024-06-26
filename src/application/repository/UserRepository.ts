import Email from '../../domain/Email'
import Id from '../../domain/Id'
import Username from '../../domain/Name'
import User from '../../domain/User'

export default interface UserRepository {
  save: (user: User) => Promise<void>
  findById: (userId: Id) => Promise<User | null>
  findByUsername: (username: Username) => Promise<User | null>
  findByEmail: (email: Email) => Promise<User | null>
  update: (user: User) => Promise<void>
}
