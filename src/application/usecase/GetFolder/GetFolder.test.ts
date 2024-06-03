import { expect, test, beforeEach } from 'vitest'
import GetFolder from '../GetFolder'
import {
  createFolder,
  folderRepository,
} from '../../../common/__test__/GenUserForTest'

let getFolder: GetFolder

beforeEach(() => {
  getFolder = new GetFolder(folderRepository)
})

test('deve ser possível buscar uma pasta', async () => {
  const { folderId, ownerId } = await createFolder()

  const outputGetFolder = await getFolder.handle({ folderId })
  expect(outputGetFolder.ownerId).toStrictEqual(ownerId)
})
