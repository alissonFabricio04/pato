import jsonwebtoken from 'jsonwebtoken'
import JwtAdapter from '../../application/adapter/JwtAdapter'
import { config } from 'dotenv'
config()

export default class JwtAdapterImpl implements JwtAdapter {
  sign(data: object) {
    return jsonwebtoken.sign(data, String(process.env.SECRET_JWT), {
      expiresIn: '1d',
    })
  }
}
