import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import log from "../config/logger";
import fileUpload from "express-fileupload";
import logRoute from "../middleware/logRoute";
import globalErrorHandler from "../middleware/globalErrorHandler";

export function buildServer() {
  const app = express();
  app.use(express.static(path.join("/")));
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUpload());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(logRoute);
  app.get("/status", (req: Request, res: Response) => {
    log.debug("checking status");
    return res.status(200).send({ status: "healthy" });
  });
  require("../routes")(app);
  app.use(globalErrorHandler);

  return app;
}
