import { UnprocessableEntity } from '../../common/error'

export default class Image {
  private value: string
  private mediaType: string
  static extensionsSupported = [
    'image/gif',
    'image/jpeg',
    'image/webp',
    'image/png',
  ]

  constructor(uri: string, mediaType: string) {
    if (!uri || uri.length <= 0 || uri.length >= 100) {
      throw new UnprocessableEntity('URI invalida')
    }
    if (
      !mediaType ||
      mediaType.length <= 0 ||
      !Image.extensionsSupported.includes(mediaType)
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
