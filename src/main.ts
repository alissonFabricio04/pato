import 'reflect-metadata'
import express from 'express'
import router from './infra/router'
import { config } from 'dotenv'
config()

const app = express()
app.use(express.json())

app.use(router)

const port = process.env.API_PORT || 8000
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`)
})
