import { expect, test, beforeEach } from 'vitest'
import SignUp from '../SignUp'
import GetUser from '../GetUser'
import { userRepository } from '../../../common/__test__/GenUserForTest'
import { randomUUID } from 'crypto'

let signUp: SignUp
let getUser: GetUser

beforeEach(() => {
  signUp = new SignUp(userRepository)
  getUser = new GetUser(userRepository)
})

test('não deve ser possível se cadastrar se as senhas não forem iguais', async () => {
  const input = {
    username: `${randomUUID().replace(/[^a-zA-Z0-9]/g, '')}`,
    email: `${randomUUID().replace(/[^a-zA-Z0-9]/g, '')}@email.com`,
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'senha diferente',
  }

  await expect(() => signUp.handle(input)).rejects.toThrow('Senhas se diferem')
})

test('não deve ser possível se cadastrar se o username já estiver em uso', async () => {
  const input = {
    username: `${randomUUID().replace(/[^a-zA-Z0-9]/g, '')}`,
    email: `${randomUUID().replace(/[^a-zA-Z0-9]/g, '')}@email.com`,
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'S3nh@MtS3gur@',
  }

  await signUp.handle(input)

  await expect(() => signUp.handle(input)).rejects.toThrow('Username já em uso')
})

test('deve ser possível se cadastrar', async () => {
  const input = {
    username: `${randomUUID().replace(/[^a-zA-Z0-9]/g, '')}`,
    email: `${randomUUID().replace(/[^a-zA-Z0-9]/g, '')}@email.com`,
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'S3nh@MtS3gur@',
  }

  const outputSignUp = await signUp.handle(input)

  const outputGetUser = await getUser.handle(outputSignUp)
  expect(outputGetUser.userId).toBeDefined()
  expect(outputGetUser.username).toStrictEqual(input.username)
})
