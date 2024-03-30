import { randomUUID } from "crypto";
import SignUp from "../../application/usecase/SignUp";
import { UserRepositoryInMemory } from "../../infra/repository/UserRepository";
import SignIn from "../../application/usecase/SignIn";
import JwtAdapterImpl from "../../infra/adapter/JwtAdapterImpl";

export const userRepositoryInMemory = new UserRepositoryInMemory()
export const jwtAdapterImpl = new JwtAdapterImpl()

function removeSpecialCharsFromUUID(uuid: string): string {
  return uuid.replace(/[^\w]/g, '')
}

export async function signUp() {
  const usecase = new SignUp(userRepositoryInMemory)
  const input = {
    username: `${removeSpecialCharsFromUUID(randomUUID())}`,
    email: `wftdenome.${randomUUID()}@email.com`,
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'S3nh@MtS3gur@',
  }
  const output = await usecase.handle(input)
  return {
    ...output,
    ...input
  }
}

export async function signIn() {
  const usecase = new SignIn(userRepositoryInMemory, jwtAdapterImpl)
  const user = await signUp()
  const input = {
    username: user.username,
    password: user.password
  }
  const output = await usecase.handle(input)
  return {
    ...output,
    ...input
  }
}