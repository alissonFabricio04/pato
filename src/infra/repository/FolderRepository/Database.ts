/* eslint-disable no-useless-constructor */

import Id from '../../../domain/Id'
import Folder from '../../../domain/Folder'
import SavePost from '../../../domain/SavePost'
import { ConnectionDatabaseType } from '../../database/Connection'
import FolderRepository from '../../../application/repository/FolderRepository'
import FolderQuery from '../../../application/query/FolderQuery'

export default class FolderRepositoryDatabase
  implements FolderRepository, FolderQuery
{
  constructor(readonly databaseConnection: ConnectionDatabaseType) {}

  async save(folder: Folder): Promise<void> {
    await this.databaseConnection.folder.create({
      data: {
        id: folder.folderId.getValue(),
        name: folder.getName(),
        fk_owner_id: folder.ownerId.getValue(),
        thumbnail: folder.getThumbnail()?.getValue(),
      },
    })
  }

  async findById(folderId: Id): Promise<Folder | null> {
    const folderModel = await this.databaseConnection.folder.findUnique({
      where: {
        id: folderId.getValue(),
      },
    })

    if (!folderModel) return null
    return Folder.restore(
      folderModel.id,
      folderModel.name,
      folderModel.fk_owner_id,
      folderModel.thumbnail ?? undefined,
    )
  }

  async update(folder: Folder): Promise<void> {
    await this.databaseConnection.folder.update({
      where: {
        id: folder.folderId.getValue(),
      },
      data: {
        name: folder.getName(),
        thumbnail: folder.getThumbnail()?.getValue(),
      },
    })
  }

  async savePost(savePost: SavePost): Promise<void> {
    await this.databaseConnection.savedPosts.create({
      data: {
        id: savePost.id.getValue(),
        fk_folder_id: savePost.getFolderId().getValue(),
        fk_post_id: savePost.postId.getValue(),
      },
    })
  }

  async getById(folderId: Id): Promise<{
    folderId: string
    ownerId: string
    name: string
    thumbnail?: { uri: string; mediaType: string } | undefined
  } | null> {
    const folderModel = await this.databaseConnection.folder.findUnique({
      where: {
        id: folderId.getValue(),
      },
    })

    if (!folderModel) return null

    let thumbnail
    if (folderModel.thumbnail) {
      const extension = folderModel.thumbnail.split(/\./).pop()
      thumbnail = {
        uri: folderModel.thumbnail,
        mediaType: `image/${extension}`,
      }
    }

    return {
      folderId: folderModel.id,
      ownerId: folderModel.fk_owner_id,
      name: folderModel.name,
      thumbnail,
    }
  }

  async getSavedPosts(folderId: Id): Promise<
    {
      postId: string
      authorId: string
      body: string | undefined
      attachments: { uri: string; mediaType: string }[]
      upvotes: number
      visibility: string
    }[]
  > {
    const savedPostsModel = await this.databaseConnection.savedPosts.findMany({
      where: {
        fk_folder_id: folderId.getValue(),
      },
      include: {
        Post: {
          include: {
            Post_attachments: true,
          },
        },
      },
    })

    if (!savedPostsModel) return []

    const savedPosts = savedPostsModel.map((savedPosts) => {
      const attachments = savedPosts.Post.Post_attachments.map((att) => {
        const extension = att.uri.split(/\./).pop()
        return {
          uri: att.uri,
          mediaType: `image/${extension}`,
        }
      })

      return {
        postId: savedPosts.Post.id,
        authorId: savedPosts.Post.fk_author_id,
        body: savedPosts.Post.body ?? undefined,
        attachments,
        upvotes: savedPosts.Post.upvotes,
        visibility: savedPosts.Post.visibility,
      }
    })

    return savedPosts
  }
}
