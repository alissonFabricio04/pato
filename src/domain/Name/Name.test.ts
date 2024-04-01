import { expect, test } from 'vitest'
import Name from '../Name'

test('não deve ser possível criar nova instância de "Name" se o name não for informado', () => {
  expect(() => new Name('')).toThrow('O nome não foi fornecido')
})

test('não deve ser possível criar uma nova instância de "Name" se o nome for muito curto', () => {
  expect(() => new Name('a')).toThrow('O nome é muito curto')
})

test('não deve ser possível criar uma nova instância de "Name" se o nome for muito longo', () => {
  let name = ''

  for (let i = 0; i < 100; i++) {
    name += 'A'
  }

  expect(() => new Name(name)).toThrow('O nome é muito longo')
})

test('não deve ser possível criar uma nova instância de "Name" se o nome tiver caracteres especiais', () => {
  expect(() => new Name('@@@@@')).toThrow(
    'O nome não deve possuir caracteres especias',
  )
})

test('deve ser capaz de obter o nome', () => {
  const name = new Name('wftDeNome')
  expect(name.getValue()).toStrictEqual('wftDeNome')
})
