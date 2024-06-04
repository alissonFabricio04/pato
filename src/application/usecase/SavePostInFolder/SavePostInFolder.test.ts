import { expect, test, beforeEach } from 'vitest'
import SavePostInFolder from '../SavePostInFolder'
import {
  publishPost,
  createFolder,
  folderRepository,
  postRepository,
  userRepository,
} from '../../../common/__test__/TestHelpers'
import GetPostsInFolder from '../GetPostsInFolder'

let savePostInFolder: SavePostInFolder
let getPostsInFolder: GetPostsInFolder

beforeEach(() => {
  savePostInFolder = new SavePostInFolder(
    folderRepository,
    postRepository,
    userRepository,
  )
  getPostsInFolder = new GetPostsInFolder(folderRepository)
})

test('deve ser capaz de salvar um post em uma pasta', async () => {
  const post = await publishPost()
  const folder = await createFolder()
  const input = {
    userId: folder.ownerId,
    folderId: folder.folderId,
    postId: post.postId,
  }

  await savePostInFolder.handle(input)
  const folderUpdated = await getPostsInFolder.handle({
    folderId: folder.folderId,
  })
  expect(folderUpdated.posts[0].authorId).toStrictEqual(post.authorId)
  expect(folderUpdated.posts[0].postId).toStrictEqual(post.postId)
  expect(folderUpdated.posts[0].upvotes).toStrictEqual(0)
})
