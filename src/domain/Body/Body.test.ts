import { expect, test } from 'vitest'
import Body from '../Body'

test('não deve ser possível criar nova instância de "Body" se o body não for informado', () => {
  expect(() => new Body('')).toThrow('Conteúdo não foi fornecido')
})

test('não deve ser possível criar uma nova instância de "Body" se o body for muito longo', () => {
  let body = ''

  for (let i = 0; i < 401; i++) {
    body += 'A'
  }

  expect(() => new Body(body)).toThrow('Conteúdo muito longo')
})

test('deve ser capaz de obter o body', () => {
  const body = new Body('conteúdo de um post')
  expect(body.getValue()).toStrictEqual('conteúdo de um post')
})
