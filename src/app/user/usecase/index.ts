const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// factory functions
import makeAddUser from './addUser'
import makeListUser from './listUser'
import makeAuthenticateUser from './authenticateUser'

// create functions and inject dependencies
const addUser = makeAddUser({hash: bcrypt.hash})
const listUser = makeListUser({})
const authenticateUser = makeAuthenticateUser({compareHash: bcrypt.compare, jwt})

export {
    addUser,
    listUser,
    authenticateUser
}