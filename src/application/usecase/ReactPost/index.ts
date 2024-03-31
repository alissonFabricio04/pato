/* eslint-disable no-useless-constructor */

import { NotFound, NotImplemented } from '../../../common/error'
import Id from '../../../domain/Id'
import { ReactFactory } from '../../../domain/React'
import PostRepository from '../../repository/PostRepository'
import ReactPostRepository from '../../repository/ReactPostRepository'
import UnitOfWork from '../../repository/UnitOfWork'
import UserRepository from '../../repository/UserRepository'

type Input = {
  userId: string
  postId: string
  react: string
}

export default class ReactPost {
  constructor(
    readonly reactPostRepository: ReactPostRepository,
    readonly postRepository: PostRepository,
    readonly userRepository: UserRepository,
    readonly unitOfWork: UnitOfWork
  ) { }

  async handle(input: Input): Promise<void> {
    const reactStrInUpperCase = String(input.react).toUpperCase()
    const postId = new Id(input.postId)
    const postExists = await this.postRepository.findById(postId)
    if (!postExists) throw new NotFound('Conteúdo não encontrado')
    const userId = new Id(input.userId)
    const userExists = await this.userRepository.findById(userId)
    if (!userExists) throw new NotFound('Usuário não encontrado')
    const reactExists = await this.reactPostRepository.findByPostId(
      postId,
    )

    if (!reactExists) {
      const react = ReactFactory
        .create(reactStrInUpperCase)
        .create(userExists.userId, postExists)

      this.unitOfWork.createTransaction([
        this.postRepository.update(postExists),
        this.reactPostRepository.save(react)
      ])
      return await this.unitOfWork.commit()
    }

    if (ReactFactory.isAReactValid(reactStrInUpperCase)) {
      if (input.react === 'SMILE') {
        reactExists.smile()
      } else if (input.react === 'REDSMILE') {
        reactExists.redSmile()
      } else {
        reactExists.unreacted()
      }
      this.unitOfWork.createTransaction([
        this.postRepository.update(postExists),
        this.reactPostRepository.update(reactExists)
      ])
      return await this.unitOfWork.commit()
    }

    throw new NotImplemented('Reação invalida')
  }
}