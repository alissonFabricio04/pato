import { expect, test, beforeEach } from 'vitest'
import GetPost from '../GetPost'
import {
  publishPost,
  postRepository,
} from '../../../common/__test__/GenUserForTest'

let getPost: GetPost

beforeEach(() => {
  getPost = new GetPost(postRepository)
})

test('não deve ser possível se buscar um post que não existe', async () => {
  await expect(() =>
    getPost.handle({ postId: '761a6aa5-9de7-41e4-bef7-6cce712a48eb' }),
  ).rejects.toThrow('Conteúdo não encontrado')
})

test('deve ser possível buscar um usuário', async () => {
  const { postId } = await publishPost()

  const outputGetPost = await getPost.handle({ postId })
  expect(outputGetPost.authorId).toBeDefined()
  expect(outputGetPost.upvotes).toStrictEqual(0)
})
