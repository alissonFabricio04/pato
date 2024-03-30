import { UnprocessableEntity } from '../../common/error'

export default class Video {
  private value: string
  private mediaType: string
  private extensionsSupported = ['video/mp4']

  constructor(uri: string, mediaType: string) {
    if (!uri || uri.length <= 0 || uri.length >= 100) {
      throw new UnprocessableEntity('URI invalida')
    }
    if (
      !mediaType ||
      mediaType.length <= 0 ||
      !this.extensionsSupported.includes(mediaType)
    ) {
      throw new UnprocessableEntity('Extensão de arquivo não suportada')
    }
    this.value = uri
    this.mediaType = mediaType
  }

  getValue() {
    return this.value
  }

  getMediaType() {
    return this.mediaType
  }
}
