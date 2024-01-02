import { buildServer } from "./lib/buildServer";
import mongoose from "mongoose";
import log from "./config/logger";
import "dotenv/config";
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

const PORT = process.env.PORT || 3001;

const server = buildServer().listen(PORT, async () => {
  log.info(`listening on port ${PORT}`);
  await mongoose.connect(`${process.env.DATABSE_URI}`);
  log.info("Connected to DB");
});
