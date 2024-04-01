import Id from '../../domain/Id'
import Folder from '../../domain/Folder'
import SavePost from '../../domain/SavePost'

export default interface FolderRepository {
  save: (folder: Folder) => Promise<void>
  findById: (folderId: Id) => Promise<Folder | null>
  update: (folder: Folder) => Promise<void>
  savePost: (savePost: SavePost) => Promise<void>
}
