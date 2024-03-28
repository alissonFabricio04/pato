/* eslint-disable @typescript-eslint/no-explicit-any */

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

test('não deve ser possível ativar a conta se a conta já estiver ativa', () => {
  const u = User.create(user.username, user.email, user.password)

  u.activeAccount()

  expect(() => u.activeAccount()).toThrow('Conta já está ativa')
})

test('não deve ser possível desativar a conta se a conta já estiver desativada', () => {
  const u = User.create(user.username, user.email, user.password)

  expect(() => u.deactiveAccount()).toThrow('Conta já está inativa')
})

test('deve ser capaz de ativar o usuário', () => {
  const u = User.create(user.username, user.email, user.password)

  u.activeAccount()

  expect(u.getIsActive()).toStrictEqual(true)
})

test('deve ser capaz de desativar o usuário', () => {
  const u = User.create(user.username, user.email, user.password)

  u.activeAccount()
  u.deactiveAccount()

  expect(u.getIsActive()).toStrictEqual(false)
})

test('não deve ser possível alterar a senha se a conta não estiver ativa', () => {
  const u = User.create(user.username, user.email, user.password)

  expect(() => u.changePassword('Al!ss0n045')).toThrow(
    'Para alterar a senha, sua conta deve estar ativa',
  )
})

test('deve ser capaz de alterar a senha', () => {
  const u = User.create(user.username, user.email, user.password)

  u.activeAccount()

  u.changePassword('Al!ss0n045')

  const password = u.getPassword()
  expect(password.algorithm).toStrictEqual('PBKDF2')
  expect(password.value).toBeDefined()
})

test('deve ser capaz de criar um usuário', () => {
  expect(User.create(user.username, user.email, user.password)).toBeInstanceOf(
    User,
  )
})

test('deve ser capaz de obter o id da conta', () => {
  const u = User.create(user.username, user.email, user.password)

  expect(u.userId.getValue()).toBeDefined()
})

test('deveria ser capaz de obter o username da conta', () => {
  const u = User.create(user.username, user.email, user.password)

  expect(u.getUsername()).toStrictEqual(user.username)
})

test('deveria ser capaz de obter o foto do perfil', () => {
  const u = User.create(user.username, user.email, user.password)

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

test('deve ser capaz de restaurar o estado do usuário', () => {
  const userCreate = User.create(user.username, user.email, user.password)

  expect(
    User.restore(
      userCreate.userId.getValue(),
      userCreate.getUsername(),
      userCreate.getEmail(),
      userCreate.getPassword().value,
      userCreate.getPassword().algorithm,
      userCreate.getPassword().salt,
      true,
    ),
  ).toBeInstanceOf(User)
})

test('deve ser capaz de restaurar o estado do usuário (foto de perfil)', () => {
  const userCreate = User.create(user.username, user.email, user.password)

  expect(
    User.restore(
      userCreate.userId.getValue(),
      userCreate.getUsername(),
      userCreate.getEmail(),
      userCreate.getPassword().value,
      userCreate.getPassword().algorithm,
      userCreate.getPassword().salt,
      true,
      {
        uri: 'https://avatars.githubusercontent.com/u/74628792',
        mediaType: 'image/png',
      },
    ),
  ).toBeInstanceOf(User)
})
