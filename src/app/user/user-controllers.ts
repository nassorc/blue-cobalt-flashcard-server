import { userService } from './user-usecases'
import createResponse from "../../lib/createResponse"
import httpStatus from '../../config/httpStatus'

export function createUserHandler() {
  return async (httpRequest) => {
    const user = await userService.createUser({userInfo: httpRequest.body})
    return createResponse(httpStatus.CREATED, {
      message: 'user successfully created'
    })
  }
}
export async function getUserHandler(httpRequest) {
  console.log("user get user", httpRequest.params.userId)
  const user = await userService.getUser(httpRequest.params.userId)
  return createResponse(httpStatus.SUCCESS, {user})
}
export async function loginUserHandler(httpRequest) {
  const {userId, cookies} = await userService.loginUser({userInfo: httpRequest.body})
  const body = {userId}
  return createResponse(httpStatus.CREATED, body, cookies as any)
}