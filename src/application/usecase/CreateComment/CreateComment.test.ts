import { expect, test, beforeEach } from 'vitest'
import CreateComment from '../CreateComment'
import {
  signUp,
  publishPost,
  publishComment,
  userRepository,
  postRepository,
  commentRepository
} from '../../../common/__test__/TestHelpers'
import GetComment from '../GetComment'

let createComment: CreateComment
let getComment: GetComment

beforeEach(() => {
  createComment = new CreateComment(commentRepository, postRepository, userRepository)
  getComment = new GetComment(commentRepository)
})

test('deve ser capaz de criar um comentario', async () => {
  const user = await signUp()
  const post = await publishPost()
  const input = {
    authorId: user.userId,
    postId: post.postId,
    comment: 'meu sonho de consumo eh um RUF SCR e um Porsche Singer DLS'
  }
  const output = await createComment.handle(input)
  const comment = await getComment.handle({ commentId: output.commentId })
  expect(comment.authorId).toStrictEqual(user.userId)
  expect(comment.postId).toStrictEqual(post.postId)
  expect(comment.comment).toStrictEqual(input.comment)
})

test('deve ser capaz de responder um comentario', async () => {
  const comment = await publishComment()
  const input = {
    authorId: comment.userId,
    postId: comment.postId,
    parentId: comment.commentId,
    comment: 'vdd, sao um sonho'
  }
  const output = await createComment.handle(input)
  const reply = await getComment.handle({ commentId: output.commentId })
  const parent = await getComment.handle({ commentId: comment.commentId })
  expect(reply.parentId).toStrictEqual(comment.commentId)
  expect(reply.replies).toStrictEqual([])
  expect(parent.replies).toStrictEqual([reply])
})
