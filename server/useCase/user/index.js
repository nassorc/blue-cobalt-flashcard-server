const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// build factor functions
const makeAddUser = require('./addUser')
const makeListUser = require('./listUser')
const makeAuthenticateUser = require('./authenticateUser')

// create functions and inject dependencies
const addUser = makeAddUser({hash: bcrypt.hash})
const listUser = makeListUser({})
const authenticateUser = makeAuthenticateUser({compareHash: bcrypt.compare, jwt})

module.exports = {
    addUser,
    listUser,
    authenticateUser
}