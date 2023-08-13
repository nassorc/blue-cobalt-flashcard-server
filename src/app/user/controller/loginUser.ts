import createResponse from "../../../utils/createResponse"

export default function makeLoginUser ({authenticateUser}) {
  return async (httpRequest) => {
    const user = await authenticateUser({userInfo: httpRequest.body})
    return createResponse(200, {user})
  } 
}