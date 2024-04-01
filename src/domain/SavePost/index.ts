/* eslint-disable no-useless-constructor */

import Id from '../Id'

export default class SavePost {
  private constructor(
    readonly id: Id,
    private folderId: Id,
    readonly postId: Id,
  ) {}

  static create(folderId: string, postId: string) {
    return new SavePost(Id.create(), new Id(folderId), new Id(postId))
  }

  static restore(id: string, folderId: string, postId: string) {
    return new SavePost(new Id(id), new Id(folderId), new Id(postId))
  }

  changeFolder(newFolderId: string) {
    this.folderId = new Id(newFolderId)
  }

  getFolderId() {
    return this.folderId
  }
}
