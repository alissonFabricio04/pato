import 'reflect-metadata'
import express from 'express'
import SignUpController from './infra/controller/SignUpController'

const app = express()
app.use(express.json())

const router = express.Router()

router.get('/hello-world', (_, res) =>
  res.json({ message: 'Hello World!' }).end(),
)

router.post('/sign-up', SignUpController)

app.use(router)

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`)
})
