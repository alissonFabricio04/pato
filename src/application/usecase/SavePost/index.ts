/* eslint-disable no-useless-constructor */

import { UnprocessableEntity } from '../../../common/error'
import Id from '../../../domain/Id'
import SavePostEntity from '../../../domain/SavePost'
import FolderRepository from '../../repository/FolderRepository'
import PostRepository from '../../repository/PostRepository'
import UserRepository from '../../repository/UserRepository'

type Input = {
  userId: string
  folderId: string
  postId: string
}

export default class SavePost {
  constructor(
    readonly folderRepository: FolderRepository,
    readonly postRepository: PostRepository,
    readonly userRepository: UserRepository,
  ) {}

  async handle(input: Input): Promise<void> {
    const userId = new Id(input.postId)
    const userExists = await this.userRepository.findById(userId)
    if (!userExists) throw new UnprocessableEntity('Usuário não encontrado')
    const postId = new Id(input.postId)
    const postExists = await this.postRepository.findById(postId)
    if (!postExists) throw new UnprocessableEntity('Conteúdo não encontrado')
    const folderId = new Id(input.folderId)
    const folderExists = await this.folderRepository.findById(folderId)
    if (!folderExists) throw new UnprocessableEntity('Pasta não encontrada')
    const savePostEntity = SavePostEntity.create(
      folderId.getValue(),
      postId.getValue(),
    )
    await this.folderRepository.savePost(savePostEntity)
  }
}
