import * as z from "zod";
import "dotenv/config";

const envVariables = z.object({
  DATABASE_URI: z.string().url({ message: "invalid url" }),
  AT_SECRET_KEY: z.string(),
  AT_TTL: z.number(),
  RT_SECRET_KEY: z.string(),
  RT_TTL: z.number(),
  OPENAI_API_KEY: z.string(),
  PORT: z.number(),
  LOG_LEVEL: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
