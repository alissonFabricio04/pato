import { Request, Response } from 'express'
import UserRepositoryDatabase from '../repository/UserRepository/Database'
import SignIn from '../../application/usecase/SignIn'
import dataSource from '../database/dataSource'
import JwtAdapterImpl from '../adapter/JwtAdapterImpl'

async function SignInController(request: Request, response: Response) {
  const userRepositoryDatabase = new UserRepositoryDatabase(await dataSource)
  const jwtAdapterImpl = new JwtAdapterImpl()
  const signIn = new SignIn(userRepositoryDatabase, jwtAdapterImpl)
  try {
    const output = await signIn.handle(request.body)
    return response.status(200).json(output).end()
  } catch (e) {
    return response
      .status(422)
      .json({ message: (e as Error).message })
      .end()
  }
}

export default SignInController
