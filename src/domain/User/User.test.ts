/* eslint-disable @typescript-eslint/no-explicit-any */

import { expect, test, beforeEach } from 'vitest'
import Image from '../Image'
import User from '../User'

let user: {
  id: string
  username: string
  email: string
  isActive: boolean
  password: string
}

beforeEach(() => {
  user = {
    id: 'd262ab0d-6d32-4a12-a651-06af51c40a69',
    username: 'Alisson',
    email: 'wtfdenome@mail.com.br',
    isActive: false,
    password: 'Al!ss0n04',
  }
})

test('não deve ser possível ativar a conta se a conta já estiver ativa', async () => {
  const u = await User.create(user.username, user.email, user.password)

  u.activeAccount()

  expect(() => u.activeAccount()).toThrow('Conta já está ativa')
})

test('não deve ser possível desativar a conta se a conta já estiver desativada', async () => {
  const u = await User.create(user.username, user.email, user.password)

  expect(() => u.deactiveAccount()).toThrow('Conta já está inativa')
})

test('deve ser capaz de ativar o usuário', async () => {
  const u = await User.create(user.username, user.email, user.password)

  u.activeAccount()

  expect(u.getIsActive()).toStrictEqual(true)
})

test('deve ser capaz de desativar o usuário', async () => {
  const u = await User.create(user.username, user.email, user.password)

  u.activeAccount()
  u.deactiveAccount()

  expect(u.getIsActive()).toStrictEqual(false)
})

test('não deve ser possível alterar a senha se a conta não estiver ativa', async () => {
  const u = await User.create(user.username, user.email, user.password)

  expect(async () => await u.changePassword('Al!ss0n045')).rejects.toThrow(
    'Para alterar a senha, sua conta deve estar ativa',
  )
})

test('deve ser capaz de alterar a senha', async () => {
  const u = await User.create(user.username, user.email, user.password)

  u.activeAccount()

  await u.changePassword('Al!ss0n045')

  const password = u.getPassword()
  expect(password.algorithm).toStrictEqual('BCRYPT')
  expect(password.value).toBeDefined()
})

test('deve ser capaz de criar um usuário', async () => {
  expect(
    await User.create(user.username, user.email, user.password),
  ).toBeInstanceOf(User)
})

test('deve ser capaz de obter o id da conta', async () => {
  const u = await User.create(user.username, user.email, user.password)

  expect(u.userId.getValue()).toBeDefined()
})

test('deveria ser capaz de obter o username da conta', async () => {
  const u = await User.create(user.username, user.email, user.password)

  expect(u.getUsername()).toStrictEqual(user.username)
})

test('deveria ser capaz de obter o foto do perfil', async () => {
  const u = await User.create(user.username, user.email, user.password)

  u.changeProfilePicture(
    'https://avatars.githubusercontent.com/u/74628792',
    'image/png',
  )

  const image = new Image(
    'https://avatars.githubusercontent.com/u/74628792',
    'image/png',
  )

  expect(u.getProfilePicture()?.getValue()).toStrictEqual(image.getValue())
  expect(u.getProfilePicture()?.getMediaType()).toStrictEqual(
    image.getMediaType(),
  )
})

test('deve ser capaz de restaurar o estado do usuário', async () => {
  const userCreate = await User.create(user.username, user.email, user.password)

  expect(
    User.restore(
      userCreate.userId.getValue(),
      userCreate.getUsername(),
      userCreate.getEmail(),
      userCreate.getPassword().value,
      true,
    ),
  ).toBeInstanceOf(User)
})

test('deve ser capaz de restaurar o estado do usuário (foto de perfil)', async () => {
  const userCreate = await User.create(user.username, user.email, user.password)

  expect(
    User.restore(
      userCreate.userId.getValue(),
      userCreate.getUsername(),
      userCreate.getEmail(),
      userCreate.getPassword().value,
      true,
      'https://avatars.githubusercontent.com/u/74628792.png',
    ),
  ).toBeInstanceOf(User)
})
