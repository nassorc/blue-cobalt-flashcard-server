const httpStatus = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401, // lacks valid credentials
  FORBIDDEN: 403, // valid credentials, but lacks the permissions
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500
} as const
export default httpStatus;