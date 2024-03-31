import Id from '../../domain/Id'
import RatePost from '../../domain/RatePost'

export default interface RatePostRepository {
  save: (rate: RatePost) => Promise<void>
  findByPostId: (postId: Id) => Promise<RatePost | null>
  update: (rate: RatePost) => Promise<void>
  delete: (rateId: Id) => Promise<void>
}