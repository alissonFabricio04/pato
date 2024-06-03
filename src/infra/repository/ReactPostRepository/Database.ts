/* eslint-disable no-useless-constructor */

import Id from '../../../domain/Id'
import ReactPostRepository from '../../../application/repository/ReactPostRepository'
import Post, { VISIBILITY } from '../../../domain/Post'
import React, { ReactFactory } from '../../../domain/React'
import { ConnectionDatabaseType } from '../../database/Connection'

export default class ReactPostRepositoryDatabase
  implements ReactPostRepository
{
  constructor(readonly databaseConnection: ConnectionDatabaseType) {}

  async save(react: React): Promise<void> {
    await this.databaseConnection.reactPost.create({
      data: {
        id: react.id.getValue(),
        react: react.state,
        fk_user_id: react.userId.getValue(),
        fk_post_id: react.post.postId.getValue(),
      },
    })
  }

  async findByPostId(postId: Id, userId: Id): Promise<React | null> {
    const reactModel = await this.databaseConnection.reactPost.findFirst({
      where: {
        fk_post_id: postId.getValue(),
        fk_user_id: userId.getValue(),
      },
      include: {
        Post: {
          include: {
            Post_attachments: true,
          },
        },
      },
    })

    if (!reactModel) return null
    const attachments = reactModel.Post.Post_attachments.map((att) => {
      return {
        uri: att.uri,
      }
    })
    const post = Post.restore(
      reactModel.Post.id,
      reactModel.Post.fk_author_id,
      reactModel.Post.body ?? undefined,
      attachments,
      reactModel.Post.upvotes,
      reactModel.Post.visibility as VISIBILITY,
    )

    return ReactFactory.create(reactModel.react).restore(
      new Id(reactModel.id),
      new Id(reactModel.fk_user_id),
      post,
    )
  }

  async update(react: React): Promise<void> {
    await this.databaseConnection.reactPost.update({
      where: {
        id: react.id.getValue(),
      },
      data: {
        react: react.state,
      },
    })
  }

  async delete(reactId: Id): Promise<void> {
    await this.databaseConnection.reactPost.delete({
      where: {
        id: reactId.getValue(),
      },
    })
  }
}
