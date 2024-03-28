import Id from '../../domain/Id'

type User = {
  userId: string
  username: string
  email: string
  profilePicture?: string
}

export default interface UserQuery {
  getById: (userId: Id) => Promise<User | null>
}
