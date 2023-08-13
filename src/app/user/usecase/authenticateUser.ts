import httpStatus from '../../../config/httpStatus'
import AppError from '../../../lib/error/AppError'
import UserModel from '../Users'

export default function makeAuthenticateUser({compareHash, jwt}) {
  return async ({ userInfo }) => {
    const { email, password } = userInfo
    const user = await UserModel.findOne({email})
    if(!user) throw new AppError('User does not exist', httpStatus.NOT_FOUND)
    const result = await compareHash(password, user.password)
    if(!result) throw new AppError('Unauthorized', httpStatus.UNAUTHORIZED)
    const token = jwt.sign({userId: user._id, email}, process.env.SECRET_KEY)
    return {token, userId: user._id}
  }
} 