import { test, expect, beforeEach } from 'vitest'
import Comment from '../Comment'

let comment: {
  authorId: string
  postId: string
  comment: string
}

beforeEach(() => {
  comment = {
    authorId: 'd262ab0d-6d32-4a12-a651-06af51c40a69',
    postId: 'fe977ca2-62a8-4e7e-89e4-7cc8831e3b9d',
    comment: 'mt bom o post',
  }
})

test('deve ser possível criar um comentario', () => {
  const c = Comment.create(comment.authorId, comment.postId, undefined, comment.comment)
  expect(c.commentId.getValue()).toBeDefined()
  expect(c.authorId.getValue()).toStrictEqual(comment.authorId)
  expect(c.postId.getValue()).toStrictEqual(comment.postId)
  expect(c.getComment()).toStrictEqual(comment.comment)
})

test('deve ser possível criar um comentario resposta', () => {
  const c = Comment.create(comment.authorId, comment.postId, undefined, comment.comment)
  const r = Comment.create(
    comment.authorId,
    comment.postId,
    c.commentId.getValue(),
    comment.comment
  )
  expect(r.commentId.getValue()).toBeDefined()
  expect(r.authorId.getValue()).toStrictEqual(comment.authorId)
  expect(r.postId.getValue()).toStrictEqual(comment.postId)
  expect(r.parentId?.getValue()).toStrictEqual(c.commentId.getValue())
  expect(r.getComment()).toStrictEqual(comment.comment)
})
