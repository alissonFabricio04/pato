import jsonwebtoken from 'jsonwebtoken'
import JwtAdapter from '../../application/adapter/JwtAdapter'

export default class JwtAdapterImpl implements JwtAdapter {
  sign(data: object) {
    return jsonwebtoken.sign(data, 'secret', {
      expiresIn: '1d',
    })
  }
}
