import createResponse from "../../../utils/createResponse"

export default function makeGetUser({ listUser }) {
  return async (httpRequest) => {
    const user = await listUser(httpRequest.params.userId)
    return createResponse(200, {user})
}
}