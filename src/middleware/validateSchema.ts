import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import AppError from '../lib/error/AppError';
import httpStatus from '../config/httpStatus';

export default function validateSchema(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    const parsedData  = schema.safeParse(data)
    
    if(!parsedData.success) next(new AppError("bad request", httpStatus.BAD_REQUEST));

    Object.assign(req.body, parsedData)
    next()
  }
}