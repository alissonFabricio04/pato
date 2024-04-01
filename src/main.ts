import 'reflect-metadata'
import express from 'express'
import router from './infra/router'

const app = express()
app.use(express.json())

app.use(router)

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`)
})
