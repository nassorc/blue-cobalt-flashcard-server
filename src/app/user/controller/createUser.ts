import createResponse from "../../../utils/createResponse"

export default function makeCreateUser({ addUser }) {
  return async (httpRequest) => {
    const user = await addUser({userInfo: httpRequest.body})
    return createResponse(201, {
      message: 'user successfully created'
    })
  }
}