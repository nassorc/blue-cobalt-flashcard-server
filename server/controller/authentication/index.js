// require dependencies
const { addUser, authenticateUser } = require('../../useCase/user')

// factory functions
const makeRegisterUser = require('./registerUserController')
const makeLoginUser = require('./loginUserController')

// inject dependencies
const registerUser = makeRegisterUser({addUser})
const loginUser = makeLoginUser({authenticateUser})

module.exports = {
    registerUser,
    loginUser
}

