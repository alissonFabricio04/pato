import express from 'express'
import SignUpController from '../controller/SignUpController'
import SignInController from '../controller/SignInController'
import GetUserController from '../controller/GetUser'

const router = express.Router()

router.get('/hello-world', (_, res) =>
  res.json({ message: 'Hello World!' }).end(),
)

router.post('/sign-up', SignUpController)
router.post('/sign-in', SignInController)

router.get('/user/:id', GetUserController)

export default router
