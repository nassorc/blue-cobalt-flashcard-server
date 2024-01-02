// @ts-nocheck
import jwt, { TokenExpiredError, Secret } from "jsonwebtoken";
import "dotenv/config";
import { ServerError } from "../lib/errors";

interface DecodedJWT {
  decoded: any;
  expired: boolean;
  valid: boolean;
}

export function signToken(
  payload: string | object | Buffer,
  key: Secret,
  options?: any
): string {
  const token = jwt.sign(payload, key, options);
  return token;
}

export function sign(
  payload: string | object | Buffer,
  opts: { ttl: number; secret: Secret }
) {
  const token = jwt.sign(payload, opts.secret, {
    expiresIn: opts.ttl,
  });
  return token;
}

export function createAccessToken(payload: string | object | Buffer) {
  if (!process.env.AT_TTL) {
    throw new ServerError("Access token TTL not defined");
  }
  return sign(payload, {
    ttl: process.env.AT_TTL,
    secret: process.env.AT_SECRET_KEY,
  });
}

export function createRefreshToken(payload: string | object | Buffer) {
  return sign(payload, {
    ttl: process.env.RT_TTL,
    secret: process.env.RT_SECRET_KEY,
  });
}

export function verifyJWT(token: string, key: Secret): DecodedJWT {
  try {
    const decoded = jwt.verify(token, key);
    return {
      decoded,
      expired: false,
      valid: true,
    };
  } catch (err: any) {
    if (err instanceof TokenExpiredError) {
      const decoded = jwt.decode(token);
      return {
        decoded: decoded,
        expired: true,
        valid: true,
      };
    } else {
      return {
        decoded: null,
        expired: false,
        valid: false,
      };
    }
  }
}
