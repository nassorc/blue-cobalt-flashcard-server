import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/errors";
import log from "../config/logger";
import HttpStatus from "../lib/httpStatus";

function globalErrorHandler(
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  log.error(err.message);
  if (err instanceof AppError) {
    // response sent
    if (res.headersSent) {
      next(err);
    }
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
      error: {
        status: err.statusCode,
        message: err.message,
      },
    });
  }
  res.status(HttpStatus.SERVER_ERROR).json({
    error: {
      status: HttpStatus.SERVER_ERROR,
      message: err.message,
    },
  });
}

export default globalErrorHandler;
