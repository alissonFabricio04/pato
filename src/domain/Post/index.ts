import { UnprocessableEntity } from '../../common/error'
import Id from '../Id'
import Image from '../Image'
import PostBody from '../PostBody'
import Video from '../Video'

export enum VISIBILITY {
  HIDDEN = 'HIDDEN', // soft-ban
  VISIBLE = 'VISIBLE',
}

export default class Post {
  private visibility: VISIBILITY

  private constructor(
    readonly postId: Id,
    readonly authorId: Id,
    readonly body: PostBody | undefined,
    readonly attachments: (Image | Video)[],
    private upvotes: number,
    visibility?: VISIBILITY,
  ) {
    if (visibility) {
      this.visibility = visibility
    } else {
      this.visibility = VISIBILITY.HIDDEN
    }
  }

  static instanceAttachments(
    attachments: { uri: string; mediaType?: string }[],
  ) {
    const attachs: (Image | Video)[] = []
    for (const attach of attachments) {
      if (attach.mediaType) {
        if (attach.mediaType.includes('video')) {
          attachs.push(new Video(attach.uri, attach.mediaType))
        } else {
          attachs.push(new Image(attach.uri, attach.mediaType))
        }
      } else {
        const extension = attach.uri.split(/\./).pop()
        if (Image.extensionsSupported.includes(`image/${extension}`)) {
          attachs.push(new Image(attach.uri, `image/${extension}`))
        } else {
          attachs.push(new Video(attach.uri, `video/${extension}`))
        }
      }
    }
    return attachs
  }

  static create(
    authorId: string,
    body: string | undefined,
    attachments: { uri: string; mediaType: string }[],
  ) {
    if (attachments.length > 5) {
      throw new UnprocessableEntity('Limite de anexos atingido')
    }

    if (body) {
      return new Post(
        Id.create(),
        new Id(authorId),
        new PostBody(body),
        this.instanceAttachments(attachments),
        0,
        VISIBILITY.VISIBLE,
      )
    }
    return new Post(
      Id.create(),
      new Id(authorId),
      undefined,
      this.instanceAttachments(attachments),
      0,
      VISIBILITY.VISIBLE,
    )
  }

  static restore(
    postId: string,
    authorId: string,
    body: string | undefined,
    attachments: { uri: string }[],
    upvotes: number,
    visibility: VISIBILITY,
  ) {
    if (body) {
      return new Post(
        new Id(postId),
        new Id(authorId),
        new PostBody(body),
        this.instanceAttachments(attachments),
        upvotes,
        visibility,
      )
    }
    return new Post(
      new Id(postId),
      new Id(authorId),
      undefined,
      this.instanceAttachments(attachments),
      upvotes,
      visibility,
    )
  }

  upvote() {
    if (this.visibility !== VISIBILITY.VISIBLE) {
      throw new UnprocessableEntity('Post não encontrado')
    }
    const newQtyUpvotes = this.upvotes + 1
    if (!this.qtyOfVotesIsValid(newQtyUpvotes)) {
      throw new UnprocessableEntity('Quantidade de upvotes inválido')
    }
    this.upvotes = newQtyUpvotes
  }

  downvote() {
    if (this.visibility !== VISIBILITY.VISIBLE) {
      throw new UnprocessableEntity('Post não encontrado')
    }
    const newQtyUpvotes = this.upvotes - 1
    if (!this.qtyOfVotesIsValid(newQtyUpvotes)) {
      throw new UnprocessableEntity('Quantidade de downvotes inválido')
    }
    this.upvotes = newQtyUpvotes
  }

  private qtyOfVotesIsValid(votes: number): boolean {
    return !(isNaN(votes) || !isFinite(votes) || !Number.isSafeInteger(votes))
  }

  getVotes() {
    return this.upvotes
  }

  getVisibility() {
    return this.visibility
  }

  changeVisibility(visibility: VISIBILITY) {
    if (visibility === this.visibility) {
      throw new UnprocessableEntity('Conflito de visibilidade')
    }
    this.visibility = visibility
  }
}
