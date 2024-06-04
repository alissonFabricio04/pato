import { expect, test, beforeEach } from 'vitest'
import GetComment from '../GetComment'
import {
  publishComment,
  commentRepository
} from '../../../common/__test__/GenUserForTest'

let getComment: GetComment

beforeEach(() => {
  getComment = new GetComment(commentRepository)
})

test('não deve ser possível se buscar um comentario que não existe', async () => {
  await expect(() =>
    getComment.handle({ commentId: '761a6aa5-9de7-41e4-bef7-6cce712a48eb' }),
  ).rejects.toThrow('Conteúdo não encontrado')
})

test('deve ser possível buscar um comentario', async () => {
  const { commentId } = await publishComment()

  const outputGetComment = await getComment.handle({ commentId })
  expect(outputGetComment.commentId).toBeDefined()
  expect(outputGetComment.commentId).toStrictEqual(commentId)
})
