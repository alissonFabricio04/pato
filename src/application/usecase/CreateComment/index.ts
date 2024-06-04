/* eslint-disable no-useless-constructor */

import { NotFound } from '../../../common/error'
import PostRepository from '../../repository/PostRepository'
import UserRepository from '../../repository/UserRepository'
import CommentRepository from '../../repository/CommentRepository'
import Comment from '../../../domain/Comment'
import Id from '../../../domain/Id'

type Input = {
  authorId: string
  postId: string
  parentId?: string
  comment: string
}

type Output = {
  commentId: string
}

export default class CreateComment {
  constructor(
    readonly commentRepository: CommentRepository,
    readonly postRepository: PostRepository,
    readonly userRepository: UserRepository,
  ) { }

  async handle(input: Input): Promise<Output> {
    const authorExists = await this.userRepository.findById(
      new Id(input.authorId),
    )
    if (!authorExists) throw new NotFound('Usuário não encontrado')
    const postExists = await this.postRepository.findById(
      new Id(input.postId),
    )
    if (!postExists) throw new NotFound('Post não encontrado')
    if (input.parentId) {
      const parentExists = await this.commentRepository.findById(new Id(input.parentId))
      if (!parentExists) throw new NotFound('Comentario não encontrado')
    }
    const comment = Comment.create(input.authorId, input.postId, input?.parentId, input.comment)
    await this.commentRepository.save(comment)
    return {
      commentId: comment.commentId.getValue(),
    }
  }
}
