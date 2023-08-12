import express from 'express'
import makeCallback from '../../middleware/controllerHandler'
import { getUser, createUser, loginUser } from './controller'
import validateToken from '../../middleware/validateToken'
import validateSchema from '../../middleware/validateSchema'
import UserSchema from './Schema'
const router = express.Router()

/**
 * @api {post} /user/login Logs in an existing user
 * @apiName LoginUser
 * @apiGroup User
 * 
 */
router.post('/login', validateSchema(UserSchema), makeCallback(loginUser))

/**
 * @api {post} /user/ Creates a new user
 * @apiName CreateUser
 * @apiGroup User
 * 
 */
router.post('/', validateSchema(UserSchema), makeCallback(createUser))

/**
 * @api {get} /:userId find user given userId as a parameter
 * @apiName FindUser
 * @apiGroup User
 * 
 */
router.get('/:userId', validateToken, makeCallback(getUser))

export default router