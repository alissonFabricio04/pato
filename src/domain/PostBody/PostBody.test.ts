import PostBody from '../PostBody'

test('não deve ser possível criar nova instância de "PostBody" se o body não for informado', () => {
  expect(() => new PostBody('')).toThrow('Conteúdo não foi fornecido')
})

test('não deve ser possível criar uma nova instância de "PostBody" se o body for muito longo', () => {
  let body = ''

  for (let i = 0; i < 401; i++) {
    body += 'A'
  }

  expect(() => new PostBody(body)).toThrow('Conteúdo muito longo')
})

test('deve ser capaz de obter o body', () => {
  const postBody = new PostBody('conteúdo de um post')
  expect(postBody.getValue()).toStrictEqual('conteúdo de um post')
})
