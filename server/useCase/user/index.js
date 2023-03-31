const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// build factor functions
const makeAddUser = require('./addUser')
const makeAuthenticateUser = require('./authenticateUser')

// create functions and inject dependencies
const addUser = makeAddUser({hash: bcrypt.hash})
const authenticateUser = makeAuthenticateUser({compareHash: bcrypt.compare, jwt})

module.exports = {
    addUser,
    authenticateUser
}