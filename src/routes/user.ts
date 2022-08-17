import { Router } from 'express'
import { registerUser, getUser, loginUser, getUserById } from '../controllers/user'
import { validateJWT } from '../middlewares/validateJWT'
const router = Router()

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/').get(getUser)
router.route('/:id').get(validateJWT, getUserById)


export default router