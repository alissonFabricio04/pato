import { Request, Response } from 'express'
import SignIn from '../../application/usecase/SignIn'
import UserRepositoryDatabase from '../repository/UserRepository/Database'
import dataSource, {
  connectDatabase,
  disconnectDatabase,
} from '../database/dataSource'
import JwtAdapterImpl from '../adapter/JwtAdapterImpl'
import ErrorHandler from '../ErrorHandler'

export default async function SignInController(
  request: Request,
  response: Response,
) {
  await connectDatabase()
  const userRepositoryDatabase = new UserRepositoryDatabase(await dataSource)
  const jwtAdapterImpl = new JwtAdapterImpl()
  const signIn = new SignIn(userRepositoryDatabase, jwtAdapterImpl)
  try {
    const output = await signIn.handle(request.body)
    return response.status(200).json(output).end()
  } catch (e) {
    const error = e as Error
    return response
      .status(ErrorHandler(error.name))
      .json({ message: error.message })
      .end()
  } finally {
    await disconnectDatabase()
  }
}
