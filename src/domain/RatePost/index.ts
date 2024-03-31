import Id from '../Id'
import Rate, { RATE } from '../Rate'

export default class RatePost extends Rate {
  private constructor(
    readonly rateId: Id,
    readonly userId: Id,
    readonly postId: Id,
    rate: string,
  ) {
    super(rateId, userId, rate)
  }

  static create(
    userId: string,
    postId: string,
    rate: string,
  ) {
    return new RatePost(
      Id.create(),
      new Id(userId),
      new Id(postId),
      rate,
    )
  }

  static restore(
    rateId: string,
    userId: string,
    postId: string,
    rate: string,
  ) {
    return new RatePost(
      new Id(rateId),
      new Id(userId),
      new Id(postId),
      rate,
    )
  }
}
