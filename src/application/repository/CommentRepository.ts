import Comment from '../../domain/Comment'
import Id from '../../domain/Id'

export default interface CommentRepository {
  save: (comment: Comment) => Promise<void>
  findById: (commentId: Id) => Promise<Comment | null>
}
