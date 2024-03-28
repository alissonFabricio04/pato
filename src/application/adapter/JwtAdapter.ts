export default interface JwtAdapter {
  sign: (data: object) => string
}
