import express from 'express'
import SignUpController from '../controller/SignUpController'
import SignInController from '../controller/SignInController'

const router = express.Router()

router.get('/hello-world', (_, res) =>
  res.json({ message: 'Hello World!' }).end(),
)

router.post('/sign-up', SignUpController)
router.post('/sign-in', SignInController)

export default router
