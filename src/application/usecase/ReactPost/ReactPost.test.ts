import { expect, test, beforeEach } from 'vitest'
import ReactPost from '../ReactPost'
import {
  publishPost,
  signUp,
  unitOfWork,
  postRepository,
  userRepository,
  reactPostRepository,
} from '../../../common/__test__/TestHelpers'
import GetPost from '../GetPost'
import { randomUUID } from 'crypto'

let getPost: GetPost
let reactPost: ReactPost

beforeEach(() => {
  getPost = new GetPost(postRepository)
  reactPost = new ReactPost(
    reactPostRepository,
    postRepository,
    userRepository,
    unitOfWork,
  )
})

test('não deve ser possível dar smile em um post se o post não for encontrado', async () => {
  const user = await signUp()

  const input = {
    userId: user.userId,
    postId: randomUUID(),
    react: 'smile',
  }
  await expect(() => reactPost.handle(input)).rejects.toThrow(
    'Conteúdo não encontrado',
  )
})

test('deve ser possível dar smile em um post', async () => {
  const post = await publishPost()
  const user = await signUp()

  const input = {
    userId: user.userId,
    postId: post.postId,
    react: 'smile',
  }
  await reactPost.handle(input)
  const postUpdated = await getPost.handle({ postId: input.postId })
  expect(postUpdated.upvotes).toStrictEqual(1)
})
