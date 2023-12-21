import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import AppError from "../lib/error/AppError";
import httpStatus from "../config/httpStatus";

export default function validateSchema(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("VALIDATING SCHEMA");
    const data = req.body;
    const parsedData = schema.safeParse(data);
    console.log("daatata", (parsedData as any).data);

    if (!parsedData.success)
      next(new AppError("bad request", httpStatus.BAD_REQUEST));

    Object.assign(req.body, (parsedData as any).data);
    next();
  };
}
