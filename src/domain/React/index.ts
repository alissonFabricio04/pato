/* eslint-disable no-useless-constructor */

import { NotImplemented, UnprocessableEntity } from '../../common/error'
import Id from '../Id'
import Post from '../Post'

enum REACTS_SUPPORTED {
  SMILE = 'SMILE',
  REDSMILE = 'REDSMILE',
  UNREACTED = 'UNREACTED',
}

export default abstract class React {
  abstract state: REACTS_SUPPORTED

  constructor(
    readonly id: Id,
    readonly userId: Id,
    readonly post: Post,
  ) {}

  abstract smile(): React
  abstract redSmile(): React
  abstract unreacted(): React
}

export class SmileReact implements React {
  state: REACTS_SUPPORTED

  private constructor(
    readonly userId: Id,
    readonly post: Post,
    readonly id: Id = Id.create(),
  ) {
    this.state = REACTS_SUPPORTED.SMILE
  }

  static create(userId: Id, post: Post, id?: Id) {
    post.upvote()
    return new SmileReact(userId, post, id)
  }

  static restore(id: Id, userId: Id, post: Post) {
    return new SmileReact(userId, post, id)
  }

  smile(): React {
    this.post.downvote()
    return this.unreacted()
  }

  redSmile(): React {
    this.post.downvote()
    return RedSmileReact.create(this.userId, this.post, this.id)
  }

  unreacted(): React {
    return UnreactedReact.create(this.userId, this.post, this.id)
  }
}

export class RedSmileReact implements React {
  state: REACTS_SUPPORTED

  private constructor(
    readonly userId: Id,
    readonly post: Post,
    readonly id: Id = Id.create(),
  ) {
    this.state = REACTS_SUPPORTED.REDSMILE
  }

  static create(userId: Id, post: Post, id?: Id) {
    post.downvote()
    return new RedSmileReact(userId, post, id)
  }

  static restore(id: Id, userId: Id, post: Post) {
    return new RedSmileReact(userId, post, id)
  }

  smile(): React {
    this.post.upvote()
    return SmileReact.create(this.userId, this.post, this.id)
  }

  redSmile(): React {
    this.post.upvote()
    return this.unreacted()
  }

  unreacted(): React {
    return UnreactedReact.create(this.userId, this.post)
  }
}

export class UnreactedReact implements React {
  state: REACTS_SUPPORTED

  private constructor(
    readonly userId: Id,
    readonly post: Post,
    readonly id: Id = Id.create(),
  ) {
    this.state = REACTS_SUPPORTED.UNREACTED
  }

  static create(userId: Id, post: Post, id?: Id) {
    return new UnreactedReact(userId, post, id)
  }

  static restore(id: Id, userId: Id, post: Post) {
    return new UnreactedReact(userId, post, id)
  }

  smile(): React {
    return SmileReact.create(this.userId, this.post, this.id)
  }

  redSmile(): React {
    return RedSmileReact.create(this.userId, this.post, this.id)
  }

  unreacted(): React {
    throw new UnprocessableEntity('Reação invalida')
  }
}

export class ReactFactory {
  static create(react: string) {
    if (ReactFactory.isAReactValid(react)) {
      if (react === REACTS_SUPPORTED.SMILE) return SmileReact
      if (react === REACTS_SUPPORTED.REDSMILE) return RedSmileReact
      if (react === REACTS_SUPPORTED.UNREACTED) return UnreactedReact
    }
    throw new NotImplemented('Reação invalida')
  }

  static isAReactValid(react: string) {
    return (
      react === REACTS_SUPPORTED.SMILE ||
      react === REACTS_SUPPORTED.REDSMILE ||
      react === REACTS_SUPPORTED.UNREACTED
    )
  }
}
