import express from "express";
import makeCallback from "../../middleware/controllerHandler";
import {
  getUserHandler,
  createUserHandler,
  loginUserHandler,
} from "./user-controllers";
import validateToken from "../../middleware/validateToken";
import validateSchema from "../../middleware/validateSchema";
import UserSchema from "./Schema";
import config from "../../config";
import UserModel from "./Users";
import { verify } from "../../utils/jwt";

import { userService } from "./user-usecases";
const router = express.Router();

router.post("/login", validateSchema(UserSchema), loginUserHandler);
router.get("/me", validateToken, getUserHandler);
router.get("/", (req, res) => {
  const { skip, limit } = req.query;
  userService.list(limit, skip);
  res.sendStatus(200);
});
router.get("/token/validate", (req, res) => {
  res.status(200).send({ valid: true });
});

router.post("/logout", async (req, res) => {
  const cookies = req.cookies;
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refreshToken"];
  if (!accessToken && !refreshToken) {
    return res.sendStatus(204); // no content
  } else {
    if (accessToken && accessToken.length > 0) {
      res.clearCookie("accessToken");
    }
    if (refreshToken && refreshToken.length > 0) {
      res.clearCookie("refreshToken", { httpOnly: true });
    }
    // await UserModel.findByIdAndUpdate(decoded.decoded.userId, {
    //   $set: { sessionValid: false },
    // });
    return res.sendStatus(200);
  }
});

export default router;
