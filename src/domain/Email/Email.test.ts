/* eslint-disable @typescript-eslint/no-explicit-any */

import Email from '../Email'

test('não deve ser possível criar uma nova instância de "Email" se o email for inválido', () => {
  expect(() => new Email(undefined as any)).toThrow(
    'Endereço de e-mail invalido',
  )
})

test('deve ser capaz de criar uma nova instância de "Email"', () => {
  expect(new Email('wtfdenome@mail.com.br')).toBeInstanceOf(Email)
})

test('deve ser possível obter o endereço de e-mail', () => {
  const email = new Email('wtfdenome@mail.com.br')
  expect(email.getValue()).toStrictEqual('wtfdenome@mail.com.br')
})
