import { listUser, addUser, authenticateUser } from '../usecase'
import makeGetUser from './getUser'
import makeCreateUser from './createUser'
import makeLoginUser from "./loginUser";

const getUser = makeGetUser({listUser})
const createUser = makeCreateUser({ addUser })
const loginUser = makeLoginUser({ authenticateUser })

export {
    getUser,
    createUser,
    loginUser
}