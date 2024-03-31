import Id from '../../domain/Id'

type Post = {
  postId: string
  authorId: string
  body: string | undefined
  attachments: { uri: string; mediaType: string }[]
  upvotes: number
  visibility: string
}

export default interface PostQuery {
  getById: (postId: Id) => Promise<Post | null>
}
