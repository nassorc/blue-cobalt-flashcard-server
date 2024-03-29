// import authRoute from './authRoute'
import { Request, Response, NextFunction } from "express";
import deckRoute from "./app/deck/deck.route";
import userRoute from "./app/user/user.route";
import { AppError } from "./lib/errors";

module.exports = (app: any) => {
  app.use("/deck", deckRoute);
  app.use("/user", userRoute);
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError("Route not found", 404));
  });
};
