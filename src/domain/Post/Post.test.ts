/* eslint-disable @typescript-eslint/no-explicit-any */

import Post, { VISIBILITY } from '../Post'
import PostBody from '../PostBody'

const post = {
  authorId: '5d86c647-3265-4cf4-babb-e5ce353a446a',
  body: 'amogus',
  attachments: [
    {
      uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      mediaType: 'video/mp4',
    },
    {
      uri: 'https://avatars.githubusercontent.com/u/74628792',
      mediaType: 'image/png',
    },
  ],
}

test('não deve ser possível criar um novo post se o número de anexos excedesse 5', () => {
  const attachments: { uri: string; mediaType: string }[] = []
  for (let i = 0; i < 23; i++) {
    attachments.push({
      uri: 'https://avatars.githubusercontent.com/u/74628792',
      mediaType: 'image/png',
    })
  }
  expect(() => Post.create(post.authorId, post.body, attachments)).toThrow(
    'Limite de anexos atingido',
  )
})

test('não deve ser possível dar upvotes em um post se o número de upvotes for inválido', () => {
  const p = Post.restore(
    '7604aa63-3336-42ae-a7a7-c20db5569a2a',
    post.authorId,
    post.body,
    post.attachments,
    Number.MAX_SAFE_INTEGER * Number.MAX_SAFE_INTEGER,
    VISIBILITY.VISIBLE,
  )
  expect(() => p.upvote()).toThrow('Quantidade de upvotes inválido')
})

test('não deve ser possível dar downvote em um post se o número de downvote for inválido', () => {
  const p = Post.restore(
    '7604aa63-3336-42ae-a7a7-c20db5569a2a',
    post.authorId,
    post.body,
    post.attachments,
    Number.MAX_SAFE_INTEGER * Number.MAX_SAFE_INTEGER,
    VISIBILITY.VISIBLE,
  )
  expect(() => p.downvote()).toThrow('Quantidade de downvotes inválido')
})

test('não deve ser possível dar upvote em um post com soft-ban', () => {
  const p = Post.create(post.authorId, post.body, post.attachments)
  p.changeVisibility(VISIBILITY.HIDDEN)
  expect(() => p.upvote()).toThrow('Post não encontrado')
})

test('não deve ser possível dar downvote em um post com soft-ban', () => {
  const p = Post.create(post.authorId, post.body, post.attachments)
  p.changeVisibility(VISIBILITY.HIDDEN)
  expect(() => p.downvote()).toThrow('Post não encontrado')
})

test('não deve ser possível mudar a visibilidade do post se a visibilidade for a mesma', () => {
  const p = Post.create(post.authorId, post.body, post.attachments)
  expect(() => p.changeVisibility(VISIBILITY.VISIBLE)).toThrow(
    'Conflito de visibilidade',
  )
})

test('deve ser possível de criar um post', () => {
  expect(
    Post.create(post.authorId, post.body, post.attachments),
  ).toBeInstanceOf(Post)
})

test('deve ser possível dar upvote no post', () => {
  const p = Post.create(post.authorId, post.body, post.attachments)
  p.upvote()
  expect(p.getVotes()).toStrictEqual(1)
})

test('deve ser possível dar downvote no post', () => {
  const p = Post.create(post.authorId, post.body, post.attachments)
  p.downvote()
  expect(p.getVotes()).toStrictEqual(-1)
})

test('deve ser possível de obter o id do post', () => {
  const p = Post.create(post.authorId, post.body, post.attachments)
  expect(p.postId.getValue()).toBeDefined()
})

test('deve ser possível de obter o id do autor', () => {
  const p = Post.create(post.authorId, post.body, post.attachments)
  expect(p.authorId.getValue()).toStrictEqual(post.authorId)
})

test('deve ser possível de obter o conteúdo do post', () => {
  const p = Post.create(post.authorId, post.body, post.attachments)
  expect((p.body as PostBody).getValue()).toStrictEqual(post.body)
})

test('deve ser possível mudar a visibilidade do post', () => {
  const p = Post.create(post.authorId, post.body, post.attachments)
  p.changeVisibility(VISIBILITY.HIDDEN)
  expect(p.getVisibility()).toStrictEqual(VISIBILITY.HIDDEN)
})

test('deve ser possível restaurar o estado do post', () => {
  const p = Post.create(post.authorId, post.body, post.attachments)
  const att = p.attachments.map((att) => {
    return {
      uri: att.getValue(),
      mediaType: att.getMediaType(),
    }
  })
  expect(
    Post.restore(
      p.postId.getValue(),
      p.authorId.getValue(),
      p.body?.getValue(),
      att,
      p.getVotes(),
      p.getVisibility(),
    ),
  ).toBeInstanceOf(Post)
})
