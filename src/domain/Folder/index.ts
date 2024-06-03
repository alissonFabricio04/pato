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

  static instanceAttachments(attachment: { uri: string; mediaType?: string }) {
    if (attachment.mediaType) {
      return new Image(attachment.uri, attachment.mediaType)
    } else {
      const extension = attachment.uri.split(/\./).pop()
      return new Image(attachment.uri, `image/${extension}`)
    }
  }

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
    thumbnailUri?: string,
  ) {
    if (!thumbnailUri) {
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
      Folder.instanceAttachments({ uri: thumbnailUri }),
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
