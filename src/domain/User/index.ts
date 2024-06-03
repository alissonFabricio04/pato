/* eslint-disable no-useless-constructor */

import { UnprocessableEntity } from '../../common/error'
import Id from '../Id'
import Image from '../Image'
import Username from '../Name'
import Password, { ALGORITHMS_SUPPORTED, PasswordFactory } from '../Password'
import Email from '../Email'

export default class User {
  private constructor(
    readonly userId: Id,
    private username: Username,
    private email: Email,
    private password: Password,
    private profilePicture?: Image,
    private isActive = false,
  ) {}

  activeAccount() {
    if (this.getIsActive()) throw new UnprocessableEntity('Conta já está ativa')
    this.isActive = true
  }

  deactiveAccount() {
    if (!this.getIsActive()) {
      throw new UnprocessableEntity('Conta já está inativa')
    }
    this.isActive = false
  }

  async changePassword(password: string) {
    if (!this.isActive) {
      throw new UnprocessableEntity(
        'Para alterar a senha, sua conta deve estar ativa',
      )
    }
    this.password = await PasswordFactory.create(
      ALGORITHMS_SUPPORTED.BCRYPT,
    ).create(password)
  }

  static async create(username: string, email: string, password: string) {
    return new User(
      Id.create(),
      new Username(username),
      new Email(email),
      await PasswordFactory.create(ALGORITHMS_SUPPORTED.BCRYPT).create(
        password,
      ),
    )
  }

  static restore(
    userId: string,
    username: string,
    email: string,
    password: string,
    isActive: boolean,
    profilePictureUri?: string,
  ) {
    if (profilePictureUri) {
      const extension = profilePictureUri.split(/\./).pop()
      const mediaType = `image/${extension}`

      return new User(
        new Id(userId),
        new Username(username),
        new Email(email),
        PasswordFactory.create(ALGORITHMS_SUPPORTED.BCRYPT).restore(password),
        new Image(profilePictureUri, mediaType),
        isActive,
      )
    }
    return new User(
      new Id(userId),
      new Username(username),
      new Email(email),
      PasswordFactory.create(ALGORITHMS_SUPPORTED.BCRYPT).restore(password),
      undefined,
      isActive,
    )
  }

  changeProfilePicture(uri: string, mediaType: string) {
    const image = new Image(uri, mediaType)
    this.profilePicture = image
  }

  getUsername() {
    return this.username.getValue()
  }

  getEmail() {
    return this.email.getValue()
  }

  getIsActive() {
    return this.isActive
  }

  getPassword() {
    return this.password
  }

  getProfilePicture() {
    return this.profilePicture
  }
}
