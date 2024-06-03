/* eslint-disable no-useless-constructor */

import { NotFound } from '../../../common/error'
import Folder from '../../../domain/Folder'
import Id from '../../../domain/Id'
import FolderRepository from '../../repository/FolderRepository'
import UserRepository from '../../repository/UserRepository'

type Input = {
  name: string
  ownerId: string
  thumbnail?: { uri: string; mediaType: string }
}

type Output = {
  folderId: string
}

export default class CreateFolder {
  constructor(
    readonly folderRepository: FolderRepository,
    readonly userRepository: UserRepository,
  ) {}

  async handle(input: Input): Promise<Output> {
    const ownerExists = await this.userRepository.findById(
      new Id(input.ownerId),
    )
    if (!ownerExists) throw new NotFound('Usuário não encontrado')
    const folder = Folder.create(input.name, input.ownerId, input.thumbnail)
    await this.folderRepository.save(folder)
    return {
      folderId: folder.folderId.getValue(),
    }
  }
}
