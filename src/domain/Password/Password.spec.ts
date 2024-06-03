import { expect, test } from 'vitest'
import {
  ALGORITHMS_SUPPORTED,
  BCRYPTPassword,
  PasswordFactory,
} from '../Password'

test('não deve ser capaz de criar senha se a senha não for informada', async () => {
  await expect(() => BCRYPTPassword.create('')).rejects.toThrow(
    'Senha inválida',
  )
})

test('não deve ser possível criar uma senha se a senha for muito curta', async () => {
  await expect(() => BCRYPTPassword.create('a')).rejects.toThrow(
    'Senha muito curta',
  )
})

test('não deve ser possível criar uma senha se a senha for muito longa', async () => {
  let password = ''
  for (let index = 0; index < 102; index++) {
    password += 'a'
  }

  await expect(() => BCRYPTPassword.create(password)).rejects.toThrow(
    'Senha muito longa',
  )
})

test('não deve ser possível criar uma senha se a senha não contiver caracteres maiúsculos', async () => {
  await expect(() => BCRYPTPassword.create('aaaaaaaaaaaa')).rejects.toThrow(
    'A senha deve possuir pelo menos uma letra maiúscula',
  )
})

test('não deve ser possível criar uma senha se a senha não contiver caracteres minúsculos', async () => {
  await expect(() =>
    BCRYPTPassword.create('AAAAAAAAAAAAAAAAAAAAAA'),
  ).rejects.toThrow('A senha deve possuir pelo menos uma letra minúscula')
})

test('não deve ser capaz de criar uma senha se a senha não contiver números', async () => {
  await expect(() => BCRYPTPassword.create('aaaaAAAAAAAAA')).rejects.toThrow(
    'A senha deve possuir pelo menos um número',
  )
})

test('não deve ser capaz de criar uma senha se a senha não contiver caracteres especiais', async () => {
  await expect(() =>
    BCRYPTPassword.create('aaaaAAAAAAAAA1111111'),
  ).rejects.toThrow('A senha deve possuir pelo menos um caractere especial')
})

test('deve ser capaz de criar uma nova instância de senha usando bcrypt', async () => {
  await expect(BCRYPTPassword.create('aaaaS3nh@')).resolves.toBeInstanceOf(
    BCRYPTPassword,
  )
})

test('deve ser capaz de restaurar o estado da senha criada com bcrypt', async () => {
  const password = 'aaaaS3nh@'
  const p = await BCRYPTPassword.create(password)
  expect(BCRYPTPassword.restore(p.value)).toBeInstanceOf(BCRYPTPassword)
})

test('deve ser capaz de validar a senha criada com bcrypt', async () => {
  const password = 'aaaaS3nh@'
  const p = await BCRYPTPassword.create(password)
  await expect(p.validate(password)).resolves.toStrictEqual(true)
})

test('deve ser capaz de criar uma nova senha usando bcrypt através da factory', async () => {
  const password = 'aaaaS3nh@'
  await expect(
    PasswordFactory.create(ALGORITHMS_SUPPORTED.BCRYPT).create(password),
  ).resolves.toBeInstanceOf(BCRYPTPassword)
})

test('não deve ser possível criar uma nova senha se o método não existir na factory', () => {
  const algorith = 'aaaaaa' as ALGORITHMS_SUPPORTED
  expect(() => PasswordFactory.create(algorith)).toThrow(
    'Criptografia não conhecida',
  )
})
