import express from "express";
import validateToken from "../../middleware/validateToken";
import validateSchema from "../../middleware/validateRequest";
import { LoginInputSchema } from "./Schema";
import { userService } from "./user-usecases";
import HttpStatus from "../../lib/httpStatus";
import "dotenv/config";

const router = express.Router();

router.get("/", async (req, res) => {
  res.sendStatus(HttpStatus.OK);
});

router.post("/", async (req, res) => {
  const { body: user } = await validateSchema(LoginInputSchema, req);
  await userService.create({ userInfo: req.body });
  res.status(HttpStatus.CREATED).send({ message: "created" });
});

router.get("/me", validateToken, async (req, res) => {
  const { id } = req.user;
  const user = await userService.query(id);
  res.status(HttpStatus.OK).send(user);
});

router.post("/login", async (req, res) => {
  const { body: credentials } = await validateSchema(LoginInputSchema, req);
  const { userId, accessToken, refreshToken } = await userService.authenticate(
    credentials
  );
  // TODO: User set age through env variables
  res.cookie("accessToken", accessToken, {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 50,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 50,
  });
  res.status(HttpStatus.OK).send({ userId });
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

router.get("/token/validate", (req, res) => {
  res.status(200).send({ valid: true });
});

export default router;
