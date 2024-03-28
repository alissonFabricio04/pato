import Username from '../Username'

test('não deve ser possível criar nova instância de "Username" se o username não for informado', () => {
  expect(() => new Username('')).toThrow('Username não foi fornecido')
})

test('não deve ser possível criar uma nova instância de "Username" se o username for muito curto', () => {
  expect(() => new Username('a')).toThrow('Username muito curto')
})

test('não deve ser possível criar uma nova instância de "Username" se o username for muito longo', () => {
  let username = ''

  for (let i = 0; i < 100; i++) {
    username += 'A'
  }

  expect(() => new Username(username)).toThrow('Username muito longo')
})

test('não deve ser possível criar uma nova instância de "Username" se o username tiver caracteres especiais', () => {
  expect(() => new Username('@@@@@')).toThrow(
    'Username não deve possuir caracteres especias',
  )
})

test('deve ser capaz de obter o username', () => {
  const name = new Username('wftDeNome')
  expect(name.getValue()).toStrictEqual('wftDeNome')
})
