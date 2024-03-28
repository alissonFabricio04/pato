import {
  ALGORITHMS_SUPPORTED,
  PBKDF2Password,
  PasswordFactory,
} from '../Password'

test('não deve ser capaz de criar senha se a senha não for informada', () => {
  expect(() => PBKDF2Password.create('')).toThrow('Senha inválida')
})

test('não deve ser possível criar uma senha se a senha for muito curta', () => {
  expect(() => PBKDF2Password.create('a')).toThrow('Senha muito curta')
})

test('não deve ser possível criar uma senha se a senha for muito longa', () => {
  let password = ''
  for (let index = 0; index < 102; index++) {
    password += 'a'
  }

  expect(() => PBKDF2Password.create(password)).toThrow('Senha muito longa')
})

test('não deve ser possível criar uma senha se a senha não contiver caracteres maiúsculos', () => {
  expect(() => PBKDF2Password.create('aaaaaaaaaaaa')).toThrow(
    'A senha deve possuir pelo menos uma letra maiúscula',
  )
})

test('não deve ser possível criar uma senha se a senha não contiver caracteres minúsculos', () => {
  expect(() => PBKDF2Password.create('AAAAAAAAAAAAAAAAAAAAAA')).toThrow(
    'A senha deve possuir pelo menos uma letra minúscula',
  )
})

test('não deve ser capaz de criar uma senha se a senha não contiver números', () => {
  expect(() => PBKDF2Password.create('aaaaAAAAAAAAA')).toThrow(
    'A senha deve possuir pelo menos um número',
  )
})

test('não deve ser capaz de criar uma senha se a senha não contiver caracteres especiais', () => {
  expect(() => PBKDF2Password.create('aaaaAAAAAAAAA1111111')).toThrow(
    'A senha deve possuir pelo menos um caractere especial',
  )
})

test('deve ser capaz de criar uma nova instância de senha usando PBKDF2', () => {
  expect(PBKDF2Password.create('aaaaS3nh@')).toBeInstanceOf(PBKDF2Password)
})

test('deve ser capaz de restaurar o estado da senha criada com pbkdf2', () => {
  const password = 'aaaaS3nh@'
  const p = PBKDF2Password.create(password)
  expect(PBKDF2Password.restore(password, p.salt)).toBeInstanceOf(
    PBKDF2Password,
  )
})

test('deve ser capaz de validar a senha criada com pbkdf2', () => {
  const password = 'aaaaS3nh@'
  const p = PBKDF2Password.create(password)
  expect(p.validate(password)).toStrictEqual(true)
})

test('deve ser capaz de criar uma nova senha usando pbkdf2 através da factory', () => {
  const password = 'aaaaS3nh@'
  expect(
    PasswordFactory.create(ALGORITHMS_SUPPORTED.PBKDF2).create(password),
  ).toBeInstanceOf(PBKDF2Password)
})

test('não deve ser possível criar uma nova senha se o método não existir na factory', () => {
  const password = 'aaaaS3nh@'
  const algorith = 'aaaaaa' as ALGORITHMS_SUPPORTED
  expect(() => PasswordFactory.create(algorith).create(password)).toThrow(
    'Criptografia não conhecida',
  )
})
