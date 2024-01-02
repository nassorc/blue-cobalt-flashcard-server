import log from "../config/logger";
import { NextFunction, Request, Response } from "express";

function logRoute(req: Request, res: Response, next: NextFunction) {
  log.debug(`${req.method} ${req.originalUrl}`);
  return next();
}

export default logRoute;
