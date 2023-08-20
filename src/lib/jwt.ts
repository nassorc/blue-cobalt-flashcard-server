import jwt, {TokenExpiredError, type SignOptions, type Secret} from 'jsonwebtoken'
interface DecodedJWT {
  decoded: any,
  expired: boolean,
  valid: boolean
}
export function signToken(payload: string | object | Buffer, key: Secret, options?: any): string {
  const token = jwt.sign(payload, key, options);
  return token
}
export function verifyToken(token: string, key: Secret): DecodedJWT{
  try {
    const decoded = jwt.verify(token, key);
    return {
      decoded,
      expired: false,
      valid: true
    }
  }
  catch(err: any) {
    if(err instanceof TokenExpiredError) {
      const decoded = jwt.decode(token);
      return {
        decoded: decoded,
        expired: true,
        valid: true
      }
    }
    else {
      return {
        decoded: null,
        expired: false,
        valid: false
      }
    }
  }
}