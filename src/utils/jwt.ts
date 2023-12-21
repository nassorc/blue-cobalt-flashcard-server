import jwt, { TokenExpiredError, SignOptions, Secret } from "jsonwebtoken";
import "dotenv/config";

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

export function sign(payload, opts: { ttl: number; secret: string }) {
  const token = jwt.sign(payload, opts.secret, {
    expiresIn: opts.ttl,
  });
  return token;
}

export function createAccessToken(payload) {
  return sign(payload, {
    ttl: parseInt(process.env.AT_TTL),
    secret: process.env.AT_SECRET_KEY,
  });
}

export function createRefreshToken(payload) {
  return sign(payload, {
    ttl: parseInt(process.env.RT_TTL),
    secret: process.env.RT_SECRET_KEY,
  });
}

export function verify(token: string, key: Secret): DecodedJWT {
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
