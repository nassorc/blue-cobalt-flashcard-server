import { Request, Response, NextFunction } from "express";
import log from "../lib/logger";
import UserModel from "../app/user/Users";
import AppError from "../lib/error/AppError";
import config from "../config"
import { signToken, verifyToken } from "../lib/jwt";
import httpStatus from "../config/httpStatus";

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  log.info('Validating tokens')
  let accessToken = req.cookies[config.api.token.at_name];
  let refreshToken = req.cookies[config.api.token.rt_name];

  if(!accessToken || !refreshToken) 
    next(new AppError('No valid tokens provided', httpStatus.UNAUTHORIZED))

  const decodedAccessToken = verifyToken(accessToken, process.env.AT_SECRET_KEY)

  // if expired, reissue if valid refresh token
  if(decodedAccessToken.expired) {
    log.info('Access Token expired')
    const decodeRefreshToken = verifyToken(refreshToken, process.env.RT_SECRET_KEY)
    // no valid or expired refresh token, don't reissue access token
    if(decodeRefreshToken.expired) {
      // set user session to invalid
      await UserModel.findByIdAndUpdate(decodeRefreshToken.decoded.userId, {$set: {sessionValid: false}})
      next(new AppError('Refresh token Expired', 401))
    }
    else if (!decodeRefreshToken.valid) {
      next(new AppError('Invalid Refresh token', 401))
    }
    const sessionValid = await (await UserModel.findById(decodeRefreshToken.decoded.userId, 'sessionValid')).sessionValid
    if(!sessionValid) {
      next(new AppError('Invalid session', 401))
    }
    // if valid refresh token, reissue access token
    log.info('Session valid, reissuing Access token')
    const reIssuedAccessToken = signToken({userId: decodeRefreshToken.decoded.userId}, process.env.AT_SECRET_KEY, {expiresIn: config.api.token.at_ttl})
    res.clearCookie(config.api.token.at_name)
    res.cookie(config.api.token.at_name, reIssuedAccessToken)
    // token reissued, call next()
    req.body = Object.assign(req.body, {locals: {userId: decodeRefreshToken.decoded.userId}})
  }
  else if(!accessToken.valid) {
    next(new AppError('Invalid Access Token', 401))
  }
  else {
    // valid access token
    req.body = Object.assign(req.body, {locals: {userId: decodedAccessToken.decoded.userId}})
  }
  next()
}
export default validateToken
