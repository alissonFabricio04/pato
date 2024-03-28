import SignIn from '../SignIn'
import SignUp from '../SignUp'
import JwtAdapterImpl from '../../../infra/adapter/JwtAdapterImpl'
import { UserRepositoryInMemory } from '../../../infra/repository/UserRepository'

let signUp: SignUp
let signIn: SignIn
let userRepositoryInMemory: UserRepositoryInMemory
let jwtAdapterImpl: JwtAdapterImpl

beforeEach(() => {
  userRepositoryInMemory = new UserRepositoryInMemory()
  jwtAdapterImpl = new JwtAdapterImpl()
  signUp = new SignUp(userRepositoryInMemory)
  signIn = new SignIn(userRepositoryInMemory, jwtAdapterImpl)
})

test('não deve ser possível fazer login se o usuário não existir', async () => {
  const input = {
    username: 'wftDeNome',
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'senha diferente',
  }

  await expect(() => signIn.handle(input)).rejects.toThrow(
    'Username ou senha inválidos',
  )
})

test('não deve ser possível fazer login se a senha for incorreta', async () => {
  const inputSignUp = {
    username: 'wftDeNome',
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'S3nh@MtS3gur@',
  }

  await signUp.handle(inputSignUp)

  const inputSignIn = {
    username: 'wftDeNome',
    password: 'S3nh@MtS3gur@aaaa',
  }
  await expect(() => signIn.handle(inputSignIn)).rejects.toThrow(
    'Senha ou username incorreto',
  )
})

test('deve ser possível fazer login', async () => {
  const inputSignUp = {
    username: 'wftDeNome',
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'S3nh@MtS3gur@',
  }

  await signUp.handle(inputSignUp)

  const inputSignIn = {
    username: 'wftDeNome',
    password: 'S3nh@MtS3gur@',
  }
  const outputSignIn = await signIn.handle(inputSignIn)
  expect(outputSignIn.token).toBeDefined()
})
