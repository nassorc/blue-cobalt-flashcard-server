type CookieType = Record<string, {
  value: string,
  httpOnly?: boolean,
  maxAge?: number
}> 
export default function createResponse(
  statusCode: number,
  body: any,
  cookies?: [CookieType],
  headers = {
    'Content-Type': 'application/json',
  },
) {
  return {
    statusCode,
    body,
    cookies,
    headers
  }
}