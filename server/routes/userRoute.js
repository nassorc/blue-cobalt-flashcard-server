const express = require('express')
const router = express.Router()
const makeCallback = require('../middleware/controllerHandler') 
const {registerUser, loginUser} = require('../controller/authentication')

/**
 * @api {post} /register Register a new user
 * @apiName RegisterUser
 * @apiGroup Authentication
 * 
 * @apiParamExample {json} Request body example:
 * {
 *  "email": "john@example.com",
 *  "password": "johnDoe123"
 * }
 * 
 * @apiSuccess {String} token Access Token
 * @apiSuccess {String} userId User Id
 * 
 * @apiError (400 Bad Request) Request body is invalid
 */
router.post('/register', makeCallback(registerUser))

/**
 * @api {post} /login Login a user
 * @apiName LoginUser
 * @apiGroup Authentication
 * 
 * @apiParamExample {json} Request body example:
 * {
 *  "email": "john@example.com",
 *  "password": "johnDoe123"
 * }
 * 
 * @apiBody {Object} [body]
 * @apiBody {String} [body[email]]
 * @apiBody {String} [body[password]]
 * 
 * @apiError (400 Bad Request) Request body is invalid
 */
router.post('/login', makeCallback(loginUser))


module.exports = router;