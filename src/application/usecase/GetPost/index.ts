/* eslint-disable no-useless-constructor */

import Id from '../../../domain/Id'
import { NotFound } from '../../../common/error'
import PostQuery from '../../query/PostQuery'

type Input = {
  postId: string
}

type Output = {
  postId: string
  authorId: string
  body: string | undefined
  attachments: { uri: string; mediaType: string }[]
  upvotes: number
  visibility: string
}

export default class GetPost {
  constructor(readonly postQuery: PostQuery) {}

  async handle(input: Input): Promise<Output> {
    const postExists = await this.postQuery.getById(new Id(input.postId))
    if (!postExists) throw new NotFound('Conteúdo não encontrado')
    return postExists
  }
}
