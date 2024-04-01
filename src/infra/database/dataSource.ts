import { DataSource } from 'typeorm'
import { config } from 'dotenv'
import { InternalServerError } from '../../common/error/InternalServerError'
config()

const {
  DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env

export default new DataSource({
  type: 'postgres',
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE,
  // eslint-disable-next-line n/no-path-concat
  entities: [__dirname + '/entity/*.{js,ts}'],
  synchronize: true,
  logging: false,
})
  .initialize()
  .then((connection) => {
    console.info('Database conectado')
    return connection
  })
  .catch(() => {
    throw new InternalServerError('Conexão com o banco de dados falhou')
  })
