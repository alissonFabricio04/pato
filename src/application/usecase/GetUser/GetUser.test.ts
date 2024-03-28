import SignUp from '../SignUp'
import GetUser from '../GetUser'
import { UserRepositoryInMemory } from '../../../infra/repository/UserRepository'

let signUp: SignUp
let getUser: GetUser
let userRepositoryInMemory: UserRepositoryInMemory

beforeEach(() => {
  userRepositoryInMemory = new UserRepositoryInMemory()
  signUp = new SignUp(userRepositoryInMemory)
  getUser = new GetUser(userRepositoryInMemory)
})

test('não deve ser possível se buscar um usuário que não existe', async () => {
  await expect(() =>
    getUser.handle({ userId: '761a6aa5-9de7-41e4-bef7-6cce712a48eb' }),
  ).rejects.toThrow('Usuário não encontrado')
})

test('deve ser possível buscar um usuário', async () => {
  const input = {
    username: 'wftDeNome',
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'S3nh@MtS3gur@',
  }

  const outputSignUp = await signUp.handle(input)

  const outputGetUser = await getUser.handle(outputSignUp)
  expect(outputGetUser.userId).toBeDefined()
  expect(outputGetUser.username).toStrictEqual(input.username)
})
