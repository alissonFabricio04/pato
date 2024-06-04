/* eslint-disable no-useless-constructor */

import { ConnectionDatabaseType } from '../../database/Connection'
import CommentRepository from '../../../application/repository/CommentRepository'
import Comment from '../../../domain/Comment'
import CommentQuery, { Comment as CommentQueryType } from '../../../application/query/CommentQuery'
import Id from '../../../domain/Id'

export default class CommentRepositoryDatabase implements CommentRepository, CommentQuery {
  constructor(readonly databaseConnection: ConnectionDatabaseType) { }

  async save(comment: Comment): Promise<void> {
    await this.databaseConnection.comment.create({
      data: {
        id: comment.commentId.getValue(),
        fk_author_id: comment.authorId.getValue(),
        fk_post_id: comment.postId.getValue(),
        parent_id: comment.parentId?.getValue(),
        comment: comment.getComment(),
      },
    })
  }

  async findById(commentId: Id): Promise<Comment | null> {
    const commentModel = await this.databaseConnection.comment.findUnique({
      where: {
        id: commentId.getValue(),
      }
    })

    if (!commentModel) return null
    return Comment.restore(
      commentModel.id,
      commentModel.fk_author_id,
      commentModel.fk_post_id,
      commentModel.parent_id ?? undefined,
      commentModel.comment,
    )
  }

  async getById(commentId: Id): Promise<CommentQueryType | null> {
    const commentModel = await this.databaseConnection.comment.findUnique({
      where: {
        id: commentId.getValue(),
      },
      include: {
        Replies: true,
      },
    })

    if (!commentModel) return null

    const replies = await Promise.all(
      commentModel.Replies.map(reply => this.getById(new Id(reply.id)))
    ) as CommentQueryType[]

    return {
      commentId: commentModel.id,
      authorId: commentModel.fk_author_id,
      postId: commentModel.fk_post_id,
      parentId: commentModel.parent_id ?? undefined,
      comment: commentModel.comment,
      replies,
    }
  }
}
