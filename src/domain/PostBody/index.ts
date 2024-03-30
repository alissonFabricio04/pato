import { BadRequest } from '../../common/error'

export default class PostBody {
  private value: string

  constructor(body: string) {
    if (!body || body.length <= 0)
      throw new BadRequest('Conteúdo não foi fornecido')
    if (body.length >= 300) throw new BadRequest('Conteúdo muito longo')
    this.value = body
  }

  getValue() {
    return this.value
  }
}
