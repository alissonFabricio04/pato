/* eslint-disable no-useless-constructor */

import Name from '../Name'
import Id from '../Id'
import Image from '../Image'

export default class Folder {
  private constructor(
    readonly folderId: Id,
    private name: Name,
    readonly ownerId: Id,
    private thumbnail: Image | undefined,
  ) {}

  static create(
    name: string,
    ownerId: string,
    thumbnail?: { uri: string; mediaType: string },
  ) {
    if (!thumbnail) {
      return new Folder(Id.create(), new Name(name), new Id(ownerId), undefined)
    }
    return new Folder(
      Id.create(),
      new Name(name),
      new Id(ownerId),
      new Image(thumbnail.uri, thumbnail.mediaType),
    )
  }

  static restore(
    folderId: string,
    name: string,
    ownerId: string,
    thumbnail?: { uri: string; mediaType: string },
  ) {
    if (!thumbnail) {
      return new Folder(
        new Id(folderId),
        new Name(name),
        new Id(ownerId),
        undefined,
      )
    }
    return new Folder(
      new Id(folderId),
      new Name(name),
      new Id(ownerId),
      new Image(thumbnail.uri, thumbnail.mediaType),
    )
  }

  changeName(newFolderName: string) {
    this.name = new Name(newFolderName)
  }

  changeThumbnail(newThumbnailUri: string, mediaType: string) {
    this.thumbnail = new Image(newThumbnailUri, mediaType)
  }

  getName() {
    return this.name.getValue()
  }

  getThumbnail(): Image | undefined {
    return this.thumbnail
  }
}
