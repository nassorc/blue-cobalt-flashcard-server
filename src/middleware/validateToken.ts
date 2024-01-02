import { Request, Response, NextFunction } from "express";
import log from "../config/logger";
import UserModel from "../app/user/Users";
import { AppError, ServerError } from "../lib/errors";
// import { signToken, verifyToken } from "../lib/jwt";
import { verifyJWT, signToken } from "../utils/jwt";
import HttpStatus from "../lib/httpStatus";

const at_key = "accessToken";
const rt_key = "refreshToken";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let accessToken = req.cookies[at_key];
  let refreshToken = req.cookies[rt_key];

  log.debug("validating");

  if (!accessToken || !refreshToken) {
    next(new AppError("No valid tokens provided", HttpStatus.UNAUTHORIZED));
  }
  if (!process.env.AT_SECRET_KEY || !process.env.RT_SECRET_KEY) {
    log.error("missing access or refresh token env variables");
    next(new ServerError("Missing env variables"));
  }

  const decodedAccessToken = verifyJWT(
    accessToken,
    process.env.AT_SECRET_KEY || ""
  );

  // if access token is expired
  if (decodedAccessToken.expired) {
    const decodeRefreshToken = verifyJWT(
      refreshToken,
      process.env.RT_SECRET_KEY || ""
    );
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
      await UserModel?.findById(
        decodeRefreshToken?.decoded?.userId,
        "sessionValid"
      )
    )?.sessionValid;
    if (!sessionValid) {
      next(new AppError("Invalid session", 401));
    }
    // if valid refresh token, reissue access token
    log.info("Session valid, reissuing Access token");
    const reIssuedAccessToken = signToken(
      { userId: decodeRefreshToken.decoded.userId },
      process.env.AT_SECRET_KEY || "",
      { expiresIn: process.env.AT_TTL }
    );
    res.clearCookie(at_key);
    res.cookie(at_key, reIssuedAccessToken);
    // token reissued, call next()
    req.body = Object.assign(req.body, {
      locals: { userId: decodeRefreshToken.decoded.userId },
    });
  } else if (!decodedAccessToken.valid) {
    next(new AppError("Invalid Access Token", 401));
  } else {
    // @ts-ignore
    req.user = {};
    Object.assign(req.user, {
      id: decodedAccessToken.decoded.userId,
    });
  }
  next();
};
export default validateToken;
