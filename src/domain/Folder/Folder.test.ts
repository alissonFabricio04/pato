import { test, expect, beforeEach } from 'vitest'
import Folder from '../Folder'

let folder: {
  name: string
  ownerId: string
}

beforeEach(() => {
  folder = {
    ownerId: 'd262ab0d-6d32-4a12-a651-06af51c40a69',
    name: 'literalmente eu',
  }
})

test('deve ser possível criar uma nova pasta', () => {
  expect(Folder.create(folder.name, folder.ownerId)).toBeInstanceOf(Folder)
})

test('deve ser possível criar uma nova pasta com thumbnail', () => {
  expect(
    Folder.create(folder.name, folder.ownerId, {
      uri: 'https://avatars.githubusercontent.com/u/74628792',
      mediaType: 'image/png',
    }),
  ).toBeInstanceOf(Folder)
})

test('deve ser possível restaurar o estado de uma pasta', () => {
  const f = Folder.create(folder.name, folder.ownerId)
  expect(
    Folder.restore(
      f.folderId.getValue(),
      f.getName(),
      f.ownerId.getValue(),
      undefined,
    ),
  ).toBeInstanceOf(Folder)
})

test('deve ser possível restaurar o estado de uma pasta com thumbnail', () => {
  const f = Folder.create(folder.name, folder.ownerId)
  expect(
    Folder.restore(f.folderId.getValue(), f.getName(), f.ownerId.getValue(), {
      uri: 'https://avatars.githubusercontent.com/u/74628792',
      mediaType: 'image/png',
    }),
  ).toBeInstanceOf(Folder)
})

test('deve ser possível mudar o nome da pasta', () => {
  const f = Folder.create(folder.name, folder.ownerId)
  f.changeName('Nome 2')
  expect(f.getName()).toStrictEqual('Nome 2')
})

test('deve ser possível mudar a thumbnail de uma pasta', () => {
  const f = Folder.create(folder.name, folder.ownerId)
  f.changeThumbnail(
    'https://avatars.githubusercontent.com/u/74628792',
    'image/png',
  )
  expect(f.getThumbnail()?.getValue()).toStrictEqual(
    'https://avatars.githubusercontent.com/u/74628792',
  )
  expect(f.getThumbnail()?.getMediaType()).toStrictEqual('image/png')
})
