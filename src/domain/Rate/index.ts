import { BadRequest } from '../../common/error'
import Id from '../Id'

export enum RATE_TYPE {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
  NOT_REACTED = 'NOT_REACTED'
}

export default abstract class Rate {
  protected rate: RATE_TYPE

  protected constructor(
    readonly rateId: Id,
    readonly userId: Id,
    rate: string,
  ) {
    this.isRateValid(rate)
    this.rate = rate as RATE_TYPE
  }

  private isRateValid(rate: string) {
    if (
      !rate ||
      rate.length <= 0 ||
      rate.length >= 20 ||
      !Object.values(RATE_TYPE).includes(rate as RATE_TYPE)
    ) {
      throw new BadRequest('Reação invalida')
    }
  }

  getRate() {
    return this.rate
  }

  changeRate(rate: RATE_TYPE | string) {
    this.isRateValid(rate)
    if (rate === this.rate) {
      this.rate = RATE_TYPE.NOT_REACTED
    } else {
      this.rate = rate as RATE_TYPE
    }
  }
}
