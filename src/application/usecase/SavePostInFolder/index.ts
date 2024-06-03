/* eslint-disable no-useless-constructor */

import { UnprocessableEntity } from '../../../common/error'
import Id from '../../../domain/Id'
import SavePost from '../../../domain/SavePost'
import FolderRepository from '../../repository/FolderRepository'
import PostRepository from '../../repository/PostRepository'
import UserRepository from '../../repository/UserRepository'

type Input = {
  userId: string
  folderId: string
  postId: string
}

export default class SavePostInFolder {
  constructor(
    readonly folderRepository: FolderRepository,
    readonly postRepository: PostRepository,
    readonly userRepository: UserRepository,
  ) {}

  async handle(input: Input): Promise<void> {
    const userExists = await this.userRepository.findById(new Id(input.userId))
    if (!userExists) throw new UnprocessableEntity('Usuário não encontrado')
    const postExists = await this.postRepository.findById(new Id(input.postId))
    if (!postExists) throw new UnprocessableEntity('Conteúdo não encontrado')
    const folderExists = await this.folderRepository.findById(
      new Id(input.folderId),
    )
    if (!folderExists) throw new UnprocessableEntity('Pasta não encontrada')
    const savePost = SavePost.create(input.folderId, input.postId)
    await this.folderRepository.savePost(savePost)
  }
}
