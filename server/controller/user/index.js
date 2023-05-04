const { listUser } = require('../../useCase/user')
const makeGetUser = require('./getUser')

const getUser = makeGetUser({listUser})

module.exports = {
    getUser,
}