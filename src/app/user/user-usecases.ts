import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from './Users'
import AppError from '../../lib/error/AppError'
import httpStatus from '../../config/httpStatus'
import config from '../../config/index'

export const userService = ((User) => {
  return {
    getUser: getUser(User),
    createUser: createUser(User),
    loginUser: loginUser(User)
  }
})(User)

function getUser(User) {
  return async (userId) => {
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(userId)}, "_id email username deck userPhoto")
    return user
  }
}

function createUser(User) {
  return async ({userInfo}) => {
    if(!userInfo) throw new AppError('Cannot create user. Missing fields', httpStatus.BAD_REQUEST);
    const {email, password} = userInfo; 
    const exist = await User.findOne({email})
    if(exist) throw new AppError('Email already exists', httpStatus.CONFLICT)

    const created = await User.create({email, password})
    return created
  }
}

function loginUser(User) {
  return async ({ userInfo }) => {
    const { email, password } = userInfo
    const user = await User.findOne({email})
    if(!user) throw new AppError('User does not exist', httpStatus.NOT_FOUND)

    const result = await user.compareHashPassword(password)
    if(!result) throw new AppError('Unauthorized', httpStatus.UNAUTHORIZED)
    // if valid credientials, set sessionValid to true
    await User.findByIdAndUpdate(user._id, {$set: {sessionValid: true}})

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

    User.findByIdAndUpdate(user._id, {$set: {sessionValid: false}})
    return {userId: user._id, cookies}
  }
}