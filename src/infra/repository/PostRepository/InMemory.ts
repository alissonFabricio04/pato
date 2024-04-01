import PostQuery from '../../../application/query/PostQuery'
import PostRepository from '../../../application/repository/PostRepository'
import Id from '../../../domain/Id'
import Post from '../../../domain/Post'

export class PostRepositoryInMemory implements PostRepository, PostQuery {
  posts: Post[] = []
  ratedPosts: { userId: Id; postId: Id; rated: string }[] = []

  async save(post: Post) {
    this.posts.push(post)
  }

  async findById(postId: Id) {
    const post = this.posts.find(
      (post) => post.postId.getValue() === postId.getValue(),
    )
    return post || null
  }

  async update(post: Post) {
    this.posts = this.posts.filter((p) => {
      if (p.postId.getValue() === post.postId.getValue()) {
        return post
      }
      return p
    })
  }

  async rate(userId: Id, post: Post, rate: string) {
    const userAlreadyRatedThisPost = this.ratedPosts.find((p) => {
      if (
        p.userId.getValue() === userId.getValue() &&
        p.postId.getValue() === post.postId.getValue()
      ) {
        return p
      }
      return undefined
    })
    if (!userAlreadyRatedThisPost) {
      this.ratedPosts.push({
        userId,
        postId: post.postId,
        rated: rate,
      })
      return
    }
    this.ratedPosts = this.ratedPosts.filter((rat) => {
      if (rat.postId.getValue() === post.postId.getValue()) {
        return {
          ...rat,
          reted: rate,
        }
      }
      return rat
    })
  }

  async ratedPost(userId: Id, postId: Id) {
    const rate = this.ratedPosts.find((rate) => {
      const itsSameUser = rate.userId.getValue() === userId.getValue()
      const itsSamePost = postId.getValue() === rate.postId.getValue()
      if (itsSameUser && itsSamePost) {
        return rate
      }
      return undefined
    })
    if (!rate) {
      return 'NOT_REACTED'
    }
    return rate.rated
  }

  async getById(postId: Id) {
    const post = this.posts.find(
      (post) => post.postId.getValue() === postId.getValue(),
    )
    if (!post) return null
    const att: { uri: string; mediaType: string }[] = []
    for (const attachment of post.attachments) {
      att.push({
        uri: attachment.getValue(),
        mediaType: attachment.getMediaType(),
      })
    }
    return {
      postId: post.postId.getValue(),
      authorId: post.authorId.getValue(),
      body: post.body?.getValue(),
      attachments: att,
      upvotes: post.getVotes(),
      visibility: post.getVisibility().toString(),
    }
  }
}
