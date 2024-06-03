import Id from '../../domain/Id'

type Folder = {
  folderId: string
  ownerId: string
  name: string
  thumbnail?: { uri: string; mediaType: string }
}

type Post = {
  postId: string
  authorId: string
  body: string | undefined
  attachments: { uri: string; mediaType: string }[]
  upvotes: number
  visibility: string
}

export default interface FolderQuery {
  getById: (folderId: Id) => Promise<Folder | null>
  getSavedPosts: (folderId: Id) => Promise<Post[]>
}
