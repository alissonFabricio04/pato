import { expect, test } from 'vitest'
import Image from '../Image'

test('não deve ser possível criar uma nova instância de "Image" se o comprimento da uri for menor/igual a 0', () => {
  expect(() => new Image('', 'image/png')).toThrow('URI invalida')
})

test('não deve ser possível criar uma nova instância de "Image" se o media type não for um tipo MIME suportado', () => {
  const uri = 'https://avatars.githubusercontent.com/u/74628792'
  const mediaType = 'image/avif'
  expect(() => new Image(uri, mediaType)).toThrow(
    'Extensão de arquivo não suportada',
  )
})

test('deve ser capaz de criar uma nova instância de "Image"', () => {
  const uri = 'https://avatars.githubusercontent.com/u/74628792'
  const mediaType = 'image/png'
  expect(new Image(uri, mediaType)).toBeInstanceOf(Image)
})

test('deve ser capaz de obter a uri da imagem', () => {
  const image = new Image(
    'https://avatars.githubusercontent.com/u/74628792',
    'image/png',
  )

  expect(image.getValue()).toStrictEqual(
    'https://avatars.githubusercontent.com/u/74628792',
  )
})

test('deve ser capaz de obter o media type da imagem', () => {
  const image = new Image(
    'https://avatars.githubusercontent.com/u/74628792',
    'image/png',
  )

  expect(image.getMediaType()).toStrictEqual('image/png')
})
