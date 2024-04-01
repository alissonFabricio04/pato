/* eslint-disable no-useless-constructor */

import { NotFound } from '../../../common/error'
import Id from '../../../domain/Id'
import Post from '../../../domain/Post'
import PostRepository from '../../repository/PostRepository'
import UserRepository from '../../repository/UserRepository'

type Input = {
  authorId: string
  body?: string
  attachments: { uri: string; mediaType: string }[]
}

type Output = {
  postId: string
}

export default class PublishPost {
  constructor(
    readonly postRepository: PostRepository,
    readonly userRepository: UserRepository,
  ) {}

  async handle(input: Input): Promise<Output> {
    const authorExists = await this.userRepository.findById(
      new Id(input.authorId),
    )
    if (!authorExists) throw new NotFound('Usuário não encontrado')
    const post = Post.create(input.authorId, input.body, input.attachments)
    await this.postRepository.save(post)
    return {
      postId: post.postId.getValue(),
    }
  }
}
