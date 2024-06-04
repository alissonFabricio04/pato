import Id from '../../domain/Id'

export type Comment = {
  commentId: string
  authorId: string
  postId: string
  parentId?: string
  comment: string
  replies: Comment[]
}

export default interface CommentQuery {
  getById: (commentId: Id) => Promise<Comment | null>
}
