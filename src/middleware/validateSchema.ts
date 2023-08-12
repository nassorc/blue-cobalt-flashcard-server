import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export default function validateSchema(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    const parsed  = schema.safeParse(schema)

    if(!parsed.success) next()

    next()
  }
}