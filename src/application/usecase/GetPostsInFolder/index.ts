/* eslint-disable no-useless-constructor */

import Id from '../../../domain/Id'
import { NotFound } from '../../../common/error'
import FolderQuery from '../../query/FolderQuery'

type Input = {
  folderId: string
}

type Output = {
  posts: {
    postId: string
    authorId: string
    body: string | undefined
    attachments: { uri: string; mediaType: string }[]
    upvotes: number
    visibility: string
  }[]
}

export default class GetPostsInFolder {
  constructor(readonly folderQuery: FolderQuery) {}

  async handle(input: Input): Promise<Output> {
    const folderId = new Id(input.folderId)
    const folderExists = await this.folderQuery.getById(folderId)
    if (!folderExists) throw new NotFound('Conteúdo não encontrado')
    const posts = await this.folderQuery.getSavedPosts(folderId)
    return {
      posts,
    }
  }
}
