import { expect, test, beforeEach } from 'vitest'
import GetPostsInFolder from '../GetPostsInFolder'
import {
  savePostInFolder,
  folderRepository,
  postRepository,
} from '../../../common/__test__/GenUserForTest'
import Id from '../../../domain/Id'

let getPostsInFolder: GetPostsInFolder

beforeEach(() => {
  getPostsInFolder = new GetPostsInFolder(folderRepository)
})

test('deve ser possível buscar os posts de uma pasta', async () => {
  const savedPost = await savePostInFolder()

  const outputGetPostsInFolder = await getPostsInFolder.handle({
    folderId: savedPost.folderId,
  })
  const post = await postRepository.getById(new Id(savedPost.postId))
  expect(outputGetPostsInFolder.posts).toStrictEqual([post])
})
