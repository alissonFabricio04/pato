/* eslint-disable no-useless-constructor */

import Body from '../Body'
import Id from '../Id'

export default class Comment {
  private constructor(
    readonly commentId: Id,
    readonly authorId: Id,
    readonly postId: Id,
    readonly parentId: Id | undefined,
    private comment: Body,
  ) { }

  static create(authorId: string, postId: string, parentId: string | undefined, comment: string) {
    if (parentId) {
      return new Comment(
        Id.create(),
        new Id(authorId),
        new Id(postId),
        new Id(parentId),
        new Body(comment),
      )
    }
    return new Comment(
      Id.create(),
      new Id(authorId),
      new Id(postId),
      undefined,
      new Body(comment),
    )
  }

  static restore(
    commentId: string,
    authorId: string,
    postId: string,
    parentId: string | undefined,
    comment: string
  ) {
    if (parentId) {
      return new Comment(
        new Id(commentId),
        new Id(authorId),
        new Id(postId),
        new Id(parentId),
        new Body(comment),
      )
    }
    return new Comment(
      new Id(commentId),
      new Id(authorId),
      new Id(postId),
      undefined,
      new Body(comment),
    )
  }

  public getComment() {
    return this.comment.getValue()
  }
}
