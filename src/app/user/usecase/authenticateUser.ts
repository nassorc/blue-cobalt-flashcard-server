import httpStatus from '../../../config/httpStatus'
import AppError from '../../../lib/error/AppError'
import UserModel from '../Users'
import config from '../../../config/index'

export default function makeAuthenticateUser({compareHash, jwt}) {
  return async ({ userInfo }) => {
    const { email, password } = userInfo
    const user = await UserModel.findOne({email})
    if(!user) throw new AppError('User does not exist', httpStatus.NOT_FOUND)

    const result = await compareHash(password, user.password)
    if(!result) throw new AppError('Unauthorized', httpStatus.UNAUTHORIZED)
    // if valid credientials, set sessionValid to true
    await UserModel.findByIdAndUpdate(user._id, {$set: {sessionValid: true}})

    const accessToken = jwt.sign({userId: user._id}, process.env.AT_SECRET_KEY, {expiresIn: config.api.token.at_ttl})
    const refreshToken = jwt.sign({userId: user._id}, process.env.RT_SECRET_KEY, {expiresIn: config.api.token.rt_ttl})
    const cookies = [
      {
        accessToken: {
          value: accessToken,
          httpOnly: false,
        },
        refreshToken: {
          value: refreshToken,
          httpOnly: true,
        },
    }]

    UserModel.findByIdAndUpdate(user._id, {$set: {sessionValid: false}})
    return {userId: user._id, cookies}
  }
} 