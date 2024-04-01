import Id from '../../domain/Id'
import Post from '../../domain/Post'

export default interface PostRepository {
  save: (post: Post) => Promise<void>
  findById: (postId: Id) => Promise<Post | null>
  update: (post: Post) => Promise<void>
}
