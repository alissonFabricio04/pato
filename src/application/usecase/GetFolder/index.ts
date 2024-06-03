/* eslint-disable no-useless-constructor */

import Id from '../../../domain/Id'
import { NotFound } from '../../../common/error'
import FolderQuery from '../../query/FolderQuery'

type Input = {
  folderId: string
}

type Output = {
  folderId: string
  ownerId: string
  name: string
  thumbnail?: { uri: string; mediaType: string }
}

export default class GetFolder {
  constructor(readonly folderQuery: FolderQuery) {}

  async handle(input: Input): Promise<Output> {
    const folderExists = await this.folderQuery.getById(new Id(input.folderId))
    if (!folderExists) throw new NotFound('Conteúdo não encontrado')
    return folderExists
  }
}
