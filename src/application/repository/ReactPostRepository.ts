import Id from '../../domain/Id'
import React from '../../domain/React'

export default interface ReactPostRepository {
  save: (react: React) => Promise<void>
  findByPostId: (postId: Id) => Promise<React | null>
  update: (react: React) => Promise<void>
}
