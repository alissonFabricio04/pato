/* eslint-disable no-useless-constructor */

import { Request, Response } from 'express'
import { UserRepositoryDatabase } from '../repository/UserRepository'
import SignUp from '../../application/usecase/SignUp'
import dataSource from '../database/dataSource'

async function SignUpController(request: Request, response: Response) {
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
    return response
      .status(422)
      .json({ message: (e as Error).message })
      .end()
  }
}

export default SignUpController
