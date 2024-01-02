import HttpStatus from "./httpStatus";

export class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}
export class BadRequest extends AppError {
  constructor(
    message: string = "Bad Request",
    status: number = HttpStatus.BAD_REQUEST
  ) {
    super(message, status);
  }
}

export class Unauthorized extends AppError {
  constructor(
    message: string = "Unauthorized",
    status: number = HttpStatus.UNAUTHORIZED
  ) {
    super(message, status);
  }
}

export class Forbidden extends AppError {
  constructor(
    message: string = "Forbidden",
    status: number = HttpStatus.FORBIDDEN
  ) {
    super(message, status);
  }
}

export class NotFound extends AppError {
  constructor(
    message: string = "Not Found",
    status: number = HttpStatus.NOT_FOUND
  ) {
    super(message, status);
  }
}

export class Conflict extends AppError {
  constructor(
    message: string = "Confict",
    status: number = HttpStatus.CONFLICT
  ) {
    super(message, status);
  }
}

export class ServerError extends AppError {
  constructor(
    message: string = "Server Error",
    status: number = HttpStatus.SERVER_ERROR
  ) {
    super(message, status);
  }
}
