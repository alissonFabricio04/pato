import ReactPost from "../ReactPost"
import { postRepositoryInMemory, publishPost, signUp, userRepositoryInMemory } from "../../../common/__test__/GenUserForTest"
import { ReactPostRepositoryInMemory } from "../../../infra/repository/ReactPostRepository"
import { UnitOfWorkInMemory } from "../../../infra/repository/UnitOfWork"
import GetPost from "../GetPost"
import { randomUUID } from "crypto"

let getPost: GetPost
let reactPost: ReactPost
let reactPostRepositoryInMemory: ReactPostRepositoryInMemory
let unitOfWorkInMemory: UnitOfWorkInMemory

beforeEach(() => {
  reactPostRepositoryInMemory = new ReactPostRepositoryInMemory()
  unitOfWorkInMemory = new UnitOfWorkInMemory()
  getPost = new GetPost(postRepositoryInMemory)
  reactPost = new ReactPost(
    reactPostRepositoryInMemory,
    postRepositoryInMemory,
    userRepositoryInMemory,
    unitOfWorkInMemory
  )
})

test('não deve ser possível dar smile em um post se o post não for encontrado', async () => {
  const user = await signUp()

  const input = {
    userId: user.userId,
    postId: randomUUID(),
    react: 'smile'
  }
  await expect(() => reactPost.handle(input)).rejects.toThrow(
    'Conteúdo não encontrado',
  )
})

test('deve ser possível dar smile em um post', async () => {
  const post = await publishPost()
  const user = await signUp()

  const input = {
    userId: user.userId,
    postId: post.postId,
    react: 'smile'
  }
  await reactPost.handle(input)
  const postUpdated = await getPost.handle({ postId: input.postId })
  expect(postUpdated.upvotes).toStrictEqual(1)
})
