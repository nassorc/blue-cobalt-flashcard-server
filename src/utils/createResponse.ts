export default function createResponse(
  statusCode: number,
  body: any,
  headers = {
    'Content-Type': 'application/json',
  },
) {
  return {
    statusCode,
    body,
    headers
  }
}