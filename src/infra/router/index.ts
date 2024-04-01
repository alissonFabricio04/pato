import express from 'express'
import SignUpController from '../controller/SignUpController'

const router = express.Router()

router.get('/hello-world', (_, res) =>
  res.json({ message: 'Hello World!' }).end(),
)

router.post('/sign-up', SignUpController)

export default router
