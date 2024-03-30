import PostRepository from '../../../application/repository/PostRepository'
import Id from '../../../domain/Id'
import Post from '../../../domain/Post'

export class PostRepositoryInMemory implements PostRepository {
  posts: Post[] = []

  async save(post: Post) {
    this.posts.push(post)
  }

  async findById(postId: Id) {
    const post = this.posts.find(
      post => post.postId.getValue() === postId.getValue(),
    )
    return post || null
  }

  async update(post: Post) {
    this.posts = this.posts.filter(p => {
      if (p.postId.getValue() === post.postId.getValue()) {
        return post
      }
      return p
    })
  }
}