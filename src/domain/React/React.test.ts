import { expect, test, beforeEach } from 'vitest'
import Id from '../Id'
import Post from '../Post'
import {
  ReactFactory,
  SmileReact,
  RedSmileReact,
  UnreactedReact,
} from '../React'

let post: Post
let userId: Id

beforeEach(() => {
  const data = {
    authorId: '5d86c647-3265-4cf4-babb-e5ce353a446a',
    body: 'amogus',
    attachments: [
      {
        uri: 'https://avatars.githubusercontent.com/u/74628792',
        mediaType: 'image/png',
      },
    ],
  }
  post = Post.create(data.authorId, data.body, data.attachments)
  userId = Id.create()
})

// ------------------ Smile ------------------
test('deve ser capaz de criar uma nova instância de "SmileReact"', () => {
  expect(SmileReact.create(userId, post)).toBeInstanceOf(SmileReact)
  expect(post.getVotes()).toStrictEqual(1)
})

test('deve ser capaz de restaurar o estado do "SmileReact"', () => {
  const react = SmileReact.create(userId, post)
  expect(SmileReact.restore(react.id, userId, post)).toBeInstanceOf(SmileReact)
  expect(post.getVotes()).toStrictEqual(1)
})

test('deve ser capaz de anular o smile de um post', () => {
  const react = SmileReact.create(userId, post)
  const newReact = react.smile()
  expect(newReact).toBeInstanceOf(UnreactedReact)
  expect(post.getVotes()).toStrictEqual(0)
})

test('deve ser capaz de mudar o smile para red smile', () => {
  const react = SmileReact.create(userId, post)
  const newReact = react.redSmile()
  expect(newReact).toBeInstanceOf(RedSmileReact)
  expect(post.getVotes()).toStrictEqual(-1)
})

// ------------------ Red Smile ------------------
test('deve ser capaz de criar uma nova instância de "RedSmileReact"', () => {
  expect(RedSmileReact.create(userId, post)).toBeInstanceOf(RedSmileReact)
  expect(post.getVotes()).toStrictEqual(-1)
})

test('deve ser capaz de restaurar o estado do "RedSmileReact"', () => {
  const react = RedSmileReact.create(userId, post)
  expect(RedSmileReact.restore(react.id, userId, post)).toBeInstanceOf(
    RedSmileReact,
  )
  expect(post.getVotes()).toStrictEqual(-1)
})

test('deve ser capaz de anular o red smile de um post', () => {
  const react = RedSmileReact.create(userId, post)
  const newReact = react.redSmile()
  expect(newReact).toBeInstanceOf(UnreactedReact)
  expect(post.getVotes()).toStrictEqual(0)
})

test('deve ser capaz de mudar o red smile para smile', () => {
  const react = RedSmileReact.create(userId, post)
  const newReact = react.smile()
  expect(newReact).toBeInstanceOf(SmileReact)
  expect(post.getVotes()).toStrictEqual(1)
})

// ------------------ Unreacted ------------------
test('deve ser capaz de criar uma nova instância de "UnreactedReact"', () => {
  expect(UnreactedReact.create(userId, post)).toBeInstanceOf(UnreactedReact)
  expect(post.getVotes()).toStrictEqual(0)
})

test('deve ser capaz de restaurar o estado do "UnreactedReact"', () => {
  const react = UnreactedReact.create(userId, post)
  expect(UnreactedReact.restore(react.id, userId, post)).toBeInstanceOf(
    UnreactedReact,
  )
  expect(post.getVotes()).toStrictEqual(0)
})

test('deve ser capaz de dar um smile em um post', () => {
  const react = UnreactedReact.create(userId, post)
  const newReact = react.smile()
  expect(newReact).toBeInstanceOf(SmileReact)
  expect(post.getVotes()).toStrictEqual(1)
})

test('deve ser capaz de dar um red smile em um post', () => {
  const react = UnreactedReact.create(userId, post)
  const newReact = react.redSmile()
  expect(newReact).toBeInstanceOf(RedSmileReact)
  expect(post.getVotes()).toStrictEqual(-1)
})

test('não deve ser capaz de dar um unreacted em um post que você já está unreacted', () => {
  const react = UnreactedReact.create(userId, post)
  expect(() => react.unreacted()).toThrow('Reação invalida')
})

// ------------------ Factory ------------------
test('deve ser capaz de criar uma nova instância de "SmileReact" através da factory', () => {
  expect(ReactFactory.create('SMILE').create(userId, post)).toBeInstanceOf(
    SmileReact,
  )
})

test('deve ser capaz de criar uma nova instância de "RedSmileReact" através da factory', () => {
  expect(ReactFactory.create('REDSMILE').create(userId, post)).toBeInstanceOf(
    RedSmileReact,
  )
})

test('deve ser capaz de criar uma nova instância de "UnreactedReact" através da factory', () => {
  expect(ReactFactory.create('UNREACTED').create(userId, post)).toBeInstanceOf(
    UnreactedReact,
  )
})

test('não deve ser possível criar uma nova instância se o método não existir na factory', () => {
  expect(() => ReactFactory.create('AAAA').create(userId, post)).toThrow(
    'Reação invalida',
  )
})
