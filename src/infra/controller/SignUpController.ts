import { Request, Response } from 'express'
import SignUp from '../../application/usecase/SignUp'
import UserRepositoryDatabase from '../repository/UserRepository/Database'
import dataSource, {
  connectDatabase,
  disconnectDatabase,
} from '../database/dataSource'
import ErrorHandler from '../ErrorHandler'

export default async function SignUpController(
  request: Request,
  response: Response,
) {
  await connectDatabase()
  const userRepositoryDatabase = new UserRepositoryDatabase(await dataSource)
  const signUp = new SignUp(userRepositoryDatabase)
  try {
    const output = await signUp.handle(request.body)
    return response
      .status(201)
      .location(`/user/${output.userId}`)
      .json(output)
      .end()
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
