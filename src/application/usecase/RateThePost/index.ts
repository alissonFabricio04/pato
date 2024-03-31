/* eslint-disable no-useless-constructor */

import { BadRequest, NotFound, UnprocessableEntity } from '../../../common/error'
import Id from '../../../domain/Id'
import { RATE_TYPE } from '../../../domain/Rate'
import RatePost from '../../../domain/RatePost'
import PostRepository from '../../repository/PostRepository'
import RatePostRepository from '../../repository/RatePostRepository'
import UnitOfWork from '../../repository/UnitOfWork'
import UserRepository from '../../repository/UserRepository'

type Input = {
  userId: string
  postId: string
  rateType: string
}

export default class RateThePost {
  constructor(
    readonly ratePostRepository: RatePostRepository,
    readonly postRepository: PostRepository,
    readonly userRepository: UserRepository,
    readonly unitOfWork: UnitOfWork
  ) { }

  async handle(input: Input): Promise<void> {
    const postId = new Id(input.postId)
    const postExists = await this.postRepository.findById(postId)
    if (!postExists) throw new NotFound('Conteúdo não encontrado')
    const userId = new Id(input.userId)
    const userExists = await this.userRepository.findById(userId)
    if (!userExists) throw new NotFound('Usuário não encontrado')
    const rateExists = await this.ratePostRepository.findByPostId(
      postId,
    )

    // se n exitir reacao:
    //    cria a reacao
    //    se reacao for igual a 'upvote':
    //        incrementa upvote
    //    se reacao for igual a 'downvote': 
    //        decrementa upvote
    //    se reacao for igual a 'nao reacao':
    //        lanca erro, pois n se pode fazer isso
    //
    //    this.unitOfWork.createTransaction([
    //      this.postRepository.update(postExists),
    //      this.ratePostRepository.save(rate)
    //    ])
    // fim
    //
    // se reacao existir:
    //    clono a reacao anterior
    //    muda a reacao original
    //    se reacao nova for igual a 'nao reacao':
    //        const operations = [this.ratePostRepository.delete(rateId)] // deleto reacao
    //
    //        se reacao anterior for igual a 'upvote':
    //            decrementa upvote
    //        se reacao anterior for igual a 'downvote':
    //            incrementa upvote
    //        se reacao anterior for igual a 'nao reacao':
    //            lanca erro, pois n se pode fazer isso
    // 
    //    this.unitOfWork.createTransaction([
    //      this.postRepository.update(postExists),
    //      ...operations
    //    ])
    // fim

    if (!rateExists) {
      const rate = RatePost.create(
        userExists.userId.getValue(),
        postExists.postId.getValue(),
        input.rateType
      )

      if (rate.getRate() === RATE_TYPE.UPVOTE) {
        postExists.upvote()
      } else if (rate.getRate() === RATE_TYPE.DOWNVOTE) {
        postExists.downvote()
      } else {
        throw new UnprocessableEntity('Reação invalida')
      }

      this.unitOfWork.createTransaction([
        this.postRepository.update(postExists),
        this.ratePostRepository.save(rate)
      ])
      return await this.unitOfWork.commit()
    }

    const previousRate = rateExists.getRate()
    rateExists.changeRate(input.rateType)
    if (rateExists.getRate() === RATE_TYPE.NOT_REACTED) {
      if (previousRate === RATE_TYPE.UPVOTE) {
        postExists.downvote()
      } else if (previousRate === RATE_TYPE.DOWNVOTE) {
        postExists.upvote()
      } else {
        throw new UnprocessableEntity('Reação invalida')
      }

      this.unitOfWork.createTransaction([
        this.postRepository.update(postExists),
        this.ratePostRepository.delete(rateExists.rateId)
      ])
    } else if (rateExists.getRate() === RATE_TYPE.UPVOTE) {
      if (previousRate === RATE_TYPE.UPVOTE) {
        throw new UnprocessableEntity('Reação invalida')
      } else if (previousRate === RATE_TYPE.DOWNVOTE) {
        postExists.upvote()
      } else {
        // postExists.downvote()
      }
    }


    // if (!userRatedThePost) {
    // postExists.upvote()
    // const rate = RatePost.create(
    //   userExists.userId.getValue(),
    //   postExists.postId.getValue(),
    //   RATE.UPVOTE
    // )
    // this.unitOfWork.createTransaction([
    //   this.postRepository.update(postExists),
    //   this.ratePostRepository.save(rate)
    // ])
    // return await this.unitOfWork.commit()
    // }






    // if (userRatedPost === "UPVOTE") {
    //   // retira a reacao e salva
    //   postExists.downvote()
    //   await this.postRepository.rate(userId, postExists, RATE.NOT_REACTED)
    // } else if (userRatedPost === "DOWNVOTE") {
    //   // chamar use case de downvote
    //   return
    // } else {
    //   await this.postRepository.rate(userId, postExists, RATE.UPVOTE)
    // }
  }
}