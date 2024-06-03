import { Request, Response } from 'express'
import GetUser from '../../application/usecase/GetUser'
import dataSource, {
  connectDatabase,
  disconnectDatabase,
} from '../database/dataSource'
import UserQueryImpl from '../query/UserQueryImpl'
import ErrorHandler from '../ErrorHandler'

export default async function GetUserController(
  request: Request,
  response: Response,
) {
  await connectDatabase()
  const userQueryImpl = new UserQueryImpl(await dataSource)
  const getUser = new GetUser(userQueryImpl)
  try {
    const input = {
      userId: request.params.id as string,
    }
    const output = await getUser.handle(input)
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
