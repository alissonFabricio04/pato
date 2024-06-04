/* eslint-disable no-useless-constructor */

import Id from '../../../domain/Id'
import { NotFound } from '../../../common/error'
import CommentQuery, { Comment } from '../../query/CommentQuery'

type Input = {
  commentId: string
}

type Output = Comment

export default class GetComment {
  constructor(readonly commentQuery: CommentQuery) { }

  async handle(input: Input): Promise<Output> {
    const commentExists = await this.commentQuery.getById(new Id(input.commentId))
    if (!commentExists) throw new NotFound('Conteúdo não encontrado')
    return commentExists
  }
}
