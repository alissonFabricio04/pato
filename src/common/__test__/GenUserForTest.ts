import { randomUUID } from 'crypto'
import SignUp from '../../application/usecase/SignUp'
import SignIn from '../../application/usecase/SignIn'
import UserRepositoryDatabase from '../../infra/repository/UserRepository/Database'
import PostRepositoryDatabase from '../../infra/repository/PostRepository/Database'
import FolderRepositoryDatabase from '../../infra/repository/FolderRepository/Database'
import ReactPostRepositoryDatabase from '../../infra/repository/ReactPostRepository/Database'
import UnitOfWorkDatabase from '../../infra/repository/UnitOfWork/Database'
import JwtAdapterImpl from '../../infra/adapter/JwtAdapterImpl'
import PublishPost from '../../application/usecase/PublishPost'
import CreateFolder from '../../application/usecase/CreateFolder'
import SavePostInFolder from '../../application/usecase/SavePostInFolder'
import { connectionDatabase } from '../../infra/database/Connection'

export const userRepository = new UserRepositoryDatabase(connectionDatabase)
export const postRepository = new PostRepositoryDatabase(connectionDatabase)
export const folderRepository = new FolderRepositoryDatabase(connectionDatabase)
export const reactPostRepository = new ReactPostRepositoryDatabase(
  connectionDatabase,
)
export const unitOfWork = new UnitOfWorkDatabase(connectionDatabase)
export const jwtAdapterImpl = new JwtAdapterImpl()

function removeSpecialCharsFromUUID(uuid: string): string {
  return uuid.replace(/[^\w]/g, '')
}

export async function signUp() {
  const usecase = new SignUp(userRepository)
  const input = {
    username: `${removeSpecialCharsFromUUID(randomUUID())}`,
    email: `wftdenome.${randomUUID()}@email.com`,
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'S3nh@MtS3gur@',
  }
  const output = await usecase.handle(input)
  return {
    ...output,
    ...input,
  }
}

export async function signIn() {
  const usecase = new SignIn(userRepository, jwtAdapterImpl)
  const user = await signUp()
  const input = {
    username: user.username,
    password: user.password,
  }
  const output = await usecase.handle(input)
  return {
    ...output,
    ...input,
  }
}

export async function publishPost() {
  const usecase = new PublishPost(postRepository, userRepository)
  const user = await signUp()
  const input = {
    authorId: user.userId,
    body: 'corpo do post',
    attachments: [],
  }
  const output = await usecase.handle(input)
  return {
    ...output,
    ...input,
  }
}

export async function createFolder() {
  const usecase = new CreateFolder(folderRepository, userRepository)
  const user = await signUp()
  const input = {
    name: 'ver mais tarde',
    ownerId: user.userId,
  }
  const output = await usecase.handle(input)
  return {
    ...output,
    ...input,
  }
}

export async function savePostInFolder() {
  const usecase = new SavePostInFolder(
    folderRepository,
    postRepository,
    userRepository,
  )
  const folder = await createFolder()
  const post = await publishPost()
  const input = {
    userId: folder.ownerId,
    folderId: folder.folderId,
    postId: post.postId,
  }
  await usecase.handle(input)
  return {
    ...folder,
    ...post,
    ...input,
  }
}
