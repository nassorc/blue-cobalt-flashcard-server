import { Request } from "express";
import * as z from "zod";
import { BadRequest } from "../lib/errors";

export default function validateRequest<T extends z.AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> {
  try {
    return schema.parseAsync(req);
  } catch (err: any) {
    throw new BadRequest(err.message);
  }
}
