import express from 'express'
import SignUpController from '../controller/SignUpController'
import SignInController from '../controller/SignInController'
import GetUserController from '../controller/GetUser'

const router = express.Router()

router.get('/version', (_, res) => res.json({ version: 'v1' }).end())

router.post('/sign-up', SignUpController)
router.post('/sign-in', SignInController)

router.get('/user/:id', GetUserController)

export default router
