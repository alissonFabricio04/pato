import { test, expect } from 'vitest'
import SavePost from '../SavePost'

const data = {
  folderId: 'd262ab0d-6d32-4a12-a651-06af51c40a69',
  postId: '51581f71-d19c-4cb6-9e31-c5f6e1fcc28a',
}

test('deve ser possível salvar um post em uma pasta', () => {
  expect(SavePost.create(data.folderId, data.postId)).toBeInstanceOf(SavePost)
})

test('deve ser possível restaurar o estado do "SavePost"', () => {
  const s = SavePost.create(data.folderId, data.postId)
  expect(
    SavePost.restore(
      s.id.getValue(),
      s.getFolderId().getValue(),
      s.postId.getValue(),
    ),
  ).toBeInstanceOf(SavePost)
})

test('deve ser possível mudar o post de pasta', () => {
  const s = SavePost.create(data.folderId, data.postId)
  s.changeFolder('b078df96-0f37-4222-8407-352a0c230e6e')
  expect(s.getFolderId().getValue()).toStrictEqual(
    'b078df96-0f37-4222-8407-352a0c230e6e',
  )
})
