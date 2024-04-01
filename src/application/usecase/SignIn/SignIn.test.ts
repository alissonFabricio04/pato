import { expect, test, beforeEach } from 'vitest'
import SignIn from '../SignIn'
import {
  jwtAdapterImpl,
  signUp,
  userRepositoryInMemory,
} from '../../../common/__test__/GenUserForTest'

let signIn: SignIn

beforeEach(() => {
  signIn = new SignIn(userRepositoryInMemory, jwtAdapterImpl)
})

test('não deve ser possível fazer login se o usuário não existir', async () => {
  const input = {
    username: 'wftDeNome',
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
