import express from 'express'
import makeCallback from '../../middleware/controllerHandler'
import { getUserHandler, createUserHandler, loginUserHandler } from './user-controllers'
import validateToken from '../../middleware/validateToken'
import validateSchema from '../../middleware/validateSchema'
import UserSchema from './Schema'
import config from '../../config'
import UserModel from './Users'
import { verifyToken } from '../../lib/jwt'
const router = express.Router()

/**
 * @api {post} /user/login Logs in an existing user
 * @apiName LoginUser
 * @apiGroup User
 * 
 */
router.post('/login', validateSchema(UserSchema), makeCallback(loginUserHandler))

/**
 * @api {post} /user/ Creates a new user
 * @apiName CreateUser
 * @apiGroup User
 * 
 */
// router.post('/', validateSchema(UserSchema), makeCallback(createUserHandler))

/**
 * @api {get} /:userId find user given userId as a parameter
 * @apiName FindUser
 * @apiGroup User
 * 
 */
router.get('/:userId', validateToken, makeCallback(getUserHandler))

router.get('/logout', async (req, res) => {
  const cookies = req.cookies
  if(!cookies[config.api.token.at_name] || !cookies[config.api.token.at_name]) {
    return res.sendStatus(204) // no content
  }
  else {
    const accessToken = cookies[config.api.token.at_name];
    const decoded = verifyToken(accessToken, config.api.token.at_secret)
    if (!decoded) {
      return res.status(500).send('couldn\'t logout user. Please try again later')
    }
    res.clearCookie(config.api.token.at_name, {httpOnly: true})
    res.clearCookie(config.api.token.rt_name, {httpOnly: true})
    await UserModel.findByIdAndUpdate(decoded.decoded.userId, { $set: { sessionValid: false }});
    return res.sendStatus(200)
  }

})

export default router