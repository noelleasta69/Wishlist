import { Router } from 'express'
import { signup, login } from '../controllers/auth.controller'
import { validate } from '../middlewares/validate'
import { signupSchema, loginSchema } from '../validators/auth.schema'

const router = Router()

//@ts-ignore
router.post('/signup', validate(signupSchema), signup)
//@ts-ignore
router.post('/login', validate(loginSchema), login)

export default router
