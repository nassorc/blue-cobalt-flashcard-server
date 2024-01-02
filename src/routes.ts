// import authRoute from './authRoute'
import { Request, Response, NextFunction } from "express";
import deckRoute from "./app/deck/deckRoute";
import userRoute from "./app/user/userRoute";
import { AppError } from "./lib/errors";
import log from "./config/logger";

module.exports = (app: any) => {
  app.use("/deck", deckRoute);
  app.use("/user", userRoute);
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError("Route not found", 404));
  });
};
