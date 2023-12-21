import { Request, Response, NextFunction } from "express";
import log from "../lib/logger";
import UserModel from "../app/user/Users";
import AppError from "../lib/error/AppError";
import config from "../config";
// import { signToken, verifyToken } from "../lib/jwt";
import { verify, signToken } from "../utils/jwt";
import httpStatus from "../config/httpStatus";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let accessToken = req.cookies[config.api.token.at_name];
  let refreshToken = req.cookies[config.api.token.rt_name];

  if (!accessToken || !refreshToken) {
    next(new AppError("No valid tokens provided", httpStatus.UNAUTHORIZED));
  }

  const decodedAccessToken = verify(accessToken, process.env.AT_SECRET_KEY);

  // if access token is expired
  if (decodedAccessToken.expired) {
    const decodeRefreshToken = verify(refreshToken, process.env.RT_SECRET_KEY);
    // if both access and refresh token are expired
    if (decodeRefreshToken.expired) {
      // set user session to invalid
      await UserModel.findByIdAndUpdate(decodeRefreshToken.decoded.userId, {
        $set: { sessionValid: false },
      });
      next(new AppError("Refresh token Expired", 401));
    } else if (!decodeRefreshToken.valid) {
      next(new AppError("Invalid Refresh token", 401));
    }

    // valid refresh token
    const sessionValid = await (
      await UserModel.findById(
        decodeRefreshToken.decoded.userId,
        "sessionValid"
      )
    ).sessionValid;
    if (!sessionValid) {
      next(new AppError("Invalid session", 401));
    }
    // if valid refresh token, reissue access token
    log.info("Session valid, reissuing Access token");
    const reIssuedAccessToken = signToken(
      { userId: decodeRefreshToken.decoded.userId },
      process.env.AT_SECRET_KEY,
      { expiresIn: config.api.token.at_ttl }
    );
    res.clearCookie(config.api.token.at_name);
    res.cookie(config.api.token.at_name, reIssuedAccessToken);
    // token reissued, call next()
    req.body = Object.assign(req.body, {
      locals: { userId: decodeRefreshToken.decoded.userId },
    });
  } else if (!decodedAccessToken.valid) {
    next(new AppError("Invalid Access Token", 401));
  } else {
    // valid access token
    req.user = {};

    req.user = Object.assign(req.user, {
      id: decodedAccessToken.decoded.userId,
    });
  }
  next();
};
export default validateToken;
