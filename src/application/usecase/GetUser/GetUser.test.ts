import { expect, test, beforeEach } from 'vitest'
import GetUser from '../GetUser'
import {
  signUp,
  userRepositoryInMemory,
} from '../../../common/__test__/GenUserForTest'

let getUser: GetUser

beforeEach(() => {
  getUser = new GetUser(userRepositoryInMemory)
})

test('não deve ser possível se buscar um usuário que não existe', async () => {
  await expect(() =>
    getUser.handle({ userId: '761a6aa5-9de7-41e4-bef7-6cce712a48eb' }),
  ).rejects.toThrow('Usuário não encontrado')
})

test('deve ser possível buscar um usuário', async () => {
  const { userId, username } = await signUp()

  const outputGetUser = await getUser.handle({ userId })
  expect(outputGetUser.userId).toBeDefined()
  expect(outputGetUser.username).toStrictEqual(username)
})
