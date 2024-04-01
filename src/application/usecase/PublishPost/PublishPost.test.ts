import { expect, test, beforeEach } from 'vitest'
import { randomUUID } from 'crypto'
import PublishPost from '../PublishPost'
import {
  signUp,
  userRepositoryInMemory,
} from '../../../common/__test__/GenUserForTest'
import { PostRepositoryInMemory } from '../../../infra/repository/PostRepository'

let publishPost: PublishPost
let postRepositoryInMemory: PostRepositoryInMemory

beforeEach(() => {
  postRepositoryInMemory = new PostRepositoryInMemory()
  publishPost = new PublishPost(postRepositoryInMemory, userRepositoryInMemory)
})

test('não deve ser possível publicar um post se o autor não existir', async () => {
  const input = {
    authorId: randomUUID(),
    body: 'corpo do post',
    attachments: [],
  }
  await expect(() => publishPost.handle(input)).rejects.toThrow(
    'Usuário não encontrado',
  )
})

test('deve ser capaz de publicar um post', async () => {
  const user = await signUp()
  const input = {
    authorId: user.userId,
    body: 'corpo do post',
    attachments: [],
  }
  const output = await publishPost.handle(input)
  expect(output.postId).toBeDefined()
})
