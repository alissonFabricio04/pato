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

  changePassword(password: string) {
    if (!this.isActive) {
      throw new UnprocessableEntity(
        'Para alterar a senha, sua conta deve estar ativa',
      )
    }
    this.password = PasswordFactory.create(ALGORITHMS_SUPPORTED.PBKDF2).create(
      password,
    )
  }

  static create(username: string, email: string, password: string) {
    return new User(
      Id.create(),
      new Username(username),
      new Email(email),
      PasswordFactory.create(ALGORITHMS_SUPPORTED.PBKDF2).create(password),
    )
  }

  static restore(
    userId: string,
    username: string,
    email: string,
    password: string,
    passwordAlgorithm: ALGORITHMS_SUPPORTED,
    salt: string,
    isActive: boolean,
    profilePicture?: {
      uri: string
      mediaType: string
    },
  ) {
    if (profilePicture) {
      return new User(
        new Id(userId),
        new Username(username),
        new Email(email),
        PasswordFactory.create(passwordAlgorithm).restore(password, salt),
        new Image(profilePicture.uri, profilePicture.mediaType),
        isActive,
      )
    }
    return new User(
      new Id(userId),
      new Username(username),
      new Email(email),
      PasswordFactory.create(passwordAlgorithm).restore(password, salt),
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
