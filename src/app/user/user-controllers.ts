import { userService } from "./user-usecases";
import createResponse from "../../lib/createResponse";
import httpStatus from "../../config/httpStatus";
import "dotenv/config";

export function createUserHandler() {
  return async (httpRequest) => {
    const user = await userService.create({ userInfo: httpRequest.body });
    return createResponse(httpStatus.CREATED, {
      message: "user successfully created",
    });
  };
}
export async function getUserHandler(req, res) {
  const { id } = req.user;

  const user = await userService.query(id);
  res.status(httpStatus.SUCCESS).send(user);
}
export async function loginUserHandler(req, res) {
  // const { userId, accessToken, refreshToken } = await userService.authenticate({
  //   userInfo: req.body,
  // });
  // const body = { userId };
  // res.status(httpStatus.SUCCESS).cookie().send(body);
  // return createResponse(httpStatus.CREATED, body, cookies as any);

  const credentials = req.body;
  const { userId, accessToken, refreshToken } = await userService.authenticate(
    credentials
  );
  res.cookie("accessToken", accessToken, {
    httpOnly: false,
    maxAge: process.env.AT_TTL,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: process.env.RT_TTL,
  });
  res.status(httpStatus.SUCCESS).send({ userId });
}
