import Id from '../Id'

test('não deve ser possível criar uma nova instância de "Id" com comprimento do id diferente que 36', () => {
  expect(() => new Id('b427')).toThrow('O id fornecido não é válido')
})

test('deve ser capaz de criar uma nova instância de "Id"', () => {
  expect(new Id('b4277dd3-1f06-4c4a-9e00-1f735788eec3')).toBeInstanceOf(Id)
})

test('deve ser capaz de obter o id', () => {
  const id = new Id('b4277dd3-1f06-4c4a-9e00-1f735788eec3')
  expect(id.getValue()).toStrictEqual('b4277dd3-1f06-4c4a-9e00-1f735788eec3')
})
