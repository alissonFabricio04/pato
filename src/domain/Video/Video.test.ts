import { expect, test } from 'vitest'
import Video from '../Video'

test('não deve ser possível criar uma nova instância de "Video" se o comprimento da uri for menor/igual a 0', () => {
  expect(() => new Video('', 'video/mp4')).toThrow('URI invalida')
})

test('não deve ser possível criar uma nova instância de "Video" se o media type não for um tipo MIME suportado', () => {
  const uri =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  const mediaType = 'video/H264'
  expect(() => new Video(uri, mediaType)).toThrow(
    'Extensão de arquivo não suportada',
  )
})

test('deve ser capaz de criar uma nova instância de "Video"', () => {
  const uri =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  const mediaType = 'video/mp4'
  expect(new Video(uri, mediaType)).toBeInstanceOf(Video)
})

test('deve ser capaz de obter a uri da video', () => {
  const video = new Video(
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'video/mp4',
  )

  expect(video.getValue()).toStrictEqual(
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  )
})

test('deve ser capaz de obter o media type da video', () => {
  const video = new Video(
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'video/mp4',
  )

  expect(video.getMediaType()).toStrictEqual('video/mp4')
})
