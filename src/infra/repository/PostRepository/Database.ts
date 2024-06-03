/* eslint-disable no-useless-constructor */

import Id from '../../../domain/Id'
import PostQuery from '../../../application/query/PostQuery'
import PostRepository from '../../../application/repository/PostRepository'
import Post, { VISIBILITY } from '../../../domain/Post'
import { ConnectionDatabaseType } from '../../database/Connection'

export default class PostRepositoryDatabase
  implements PostRepository, PostQuery
{
  constructor(readonly databaseConnection: ConnectionDatabaseType) {}

  async save(post: Post): Promise<void> {
    await this.databaseConnection.post.create({
      data: {
        id: post.postId.getValue(),
        fk_author_id: post.authorId.getValue(),
        body: post.body?.getValue(),
        upvotes: post.getVotes(),
        visibility: post.getVisibility(),
      },
    })
  }

  async findById(postId: Id): Promise<Post | null> {
    const postModel = await this.databaseConnection.post.findUnique({
      where: {
        id: postId.getValue(),
      },
      include: {
        Post_attachments: true,
      },
    })

    if (!postModel) return null
    const attachments = postModel.Post_attachments.map((att) => {
      return {
        uri: att.uri,
      }
    })
    return Post.restore(
      postModel.id,
      postModel.fk_author_id,
      postModel.body ?? undefined,
      attachments,
      postModel.upvotes,
      postModel.visibility as VISIBILITY,
    )
  }

  async update(post: Post): Promise<void> {
    await this.databaseConnection.post.update({
      where: {
        id: post.postId.getValue(),
      },
      data: {
        body: post.body?.getValue(),
        upvotes: post.getVotes(),
        visibility: post.getVisibility(),
      },
    })
  }

  async getById(postId: Id): Promise<{
    postId: string
    authorId: string
    body: string | undefined
    attachments: { uri: string; mediaType: string }[]
    upvotes: number
    visibility: string
  } | null> {
    const postModel = await this.databaseConnection.post.findUnique({
      where: {
        id: postId.getValue(),
      },
      include: {
        Post_attachments: true,
      },
    })

    if (!postModel) return null

    const attachments = postModel.Post_attachments.map((att) => {
      const extension = att.uri.split(/\./).pop()
      return {
        uri: att.uri,
        mediaType: `image/${extension}`,
      }
    })

    return {
      postId: postModel.id,
      authorId: postModel.fk_author_id,
      body: postModel.body ?? undefined,
      attachments,
      upvotes: postModel.upvotes,
      visibility: postModel.visibility,
    }
  }
}
