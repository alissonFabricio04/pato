import ReactPostRepository from '../../../application/repository/ReactPostRepository'
import Id from '../../../domain/Id'
import React from '../../../domain/React'

export class ReactPostRepositoryInMemory implements ReactPostRepository {
  reacts: React[] = []

  async save(react: React) {
    this.reacts.push(react)
  }

  async findByPostId(postId: Id) {
    const react = this.reacts.find(
      react => react.post.postId.getValue() === postId.getValue(),
    )
    return react || null
  }

  async update(react: React) {
    this.reacts = this.reacts.filter(r => {
      if (r.id.getValue() === react.id.getValue()) {
        return react
      }
      return r
    })
  }
}