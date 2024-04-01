import { Request, Response } from 'express'
import GetUser from '../../application/usecase/GetUser'
import dataSource from '../database/dataSource'
import UserQueryImpl from '../query/UserQueryImpl'

async function GetUserController(request: Request, response: Response) {
  const userQueryImpl = new UserQueryImpl(await dataSource)
  const getUser = new GetUser(userQueryImpl)
  try {
    const input = {
      userId: request.params.id as string,
    }
    const output = await getUser.handle(input)
    return response.status(200).json(output).end()
  } catch (e) {
    return response
      .status(422)
      .json({ message: (e as Error).message })
      .end()
  }
}

export default GetUserController
