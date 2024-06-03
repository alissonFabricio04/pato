import { expect, test, beforeEach } from 'vitest'
import SignIn from '../SignIn'
import {
  signUp,
  jwtAdapterImpl,
  userRepository,
} from '../../../common/__test__/GenUserForTest'
import { randomUUID } from 'crypto'

let signIn: SignIn

beforeEach(() => {
  signIn = new SignIn(userRepository, jwtAdapterImpl)
})

test('não deve ser possível fazer login se o usuário não existir', async () => {
  const input = {
    username: `${randomUUID().replace(/[^a-zA-Z0-9]/g, '')}`,
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'senha diferente',
  }

  await expect(() => signIn.handle(input)).rejects.toThrow(
    'Username ou senha inválidos',
  )
})

test('não deve ser possível fazer login se a senha for incorreta', async () => {
  const user = await signUp()

  const input = {
    username: user.username,
    password: 'S3nh@MtS3gur@aaaa',
  }
  await expect(() => signIn.handle(input)).rejects.toThrow(
    'Senha ou username incorreto',
  )
})

test('deve ser possível fazer login', async () => {
  const user = await signUp()

  const input = {
    username: user.username,
    password: user.password,
  }
  const output = await signIn.handle(input)
  expect(output.token).toBeDefined()
})
