import createResponse from "../../../lib/createResponse"

export default function makeLoginUser ({authenticateUser}) {
  return async (httpRequest) => {
    const {token, userId, cookies} = await authenticateUser({userInfo: httpRequest.body})
    const body = {token, userId}
    return createResponse(200, body, cookies)
  } 
}