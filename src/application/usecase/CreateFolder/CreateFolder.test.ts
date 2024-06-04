import { expect, test, beforeEach } from 'vitest'
import CreateFolder from '../CreateFolder'
import {
  signUp,
  userRepository,
  folderRepository,
} from '../../../common/__test__/TestHelpers'

let createFolder: CreateFolder

beforeEach(() => {
  createFolder = new CreateFolder(folderRepository, userRepository)
})

// test('não deve ser possível publicar um post se o autor não existir', async () => {
//   const input = {
//     authorId: randomUUID(),
//     body: 'corpo do post',
//     attachments: [],
//   }
//   await expect(() => publishPost.handle(input)).rejects.toThrow(
//     'Usuário não encontrado',
//   )
// })

test('deve ser capaz de criar uma pasta', async () => {
  const user = await signUp()
  const input = {
    name: 'ver mais tarde',
    ownerId: user.userId,
  }
  const output = await createFolder.handle(input)
  expect(output.folderId).toBeDefined()
})
