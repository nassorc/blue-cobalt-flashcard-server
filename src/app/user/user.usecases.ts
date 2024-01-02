import mongoose from "mongoose";
import User from "./Users";
import { AppError, NotFound, Conflict, Unauthorized } from "../../lib/errors";
import { createAccessToken, createRefreshToken } from "../../utils/jwt";
import HttpStatus from "../../lib/httpStatus";

export const userService = ((User) => {
  return {
    query: query,
    create: create,
    authenticate: authenticate,
    list: list,
  };
})(User);

async function hasDeckPriveleges() {}

async function isAuthenticated() {}

async function query(userId: string) {
  const user = await User.findOne(
    { _id: new mongoose.Types.ObjectId(userId) },
    "_id email firstName lastName username deck userPhoto profileImage decks"
  ).populate("decks");
  return user;
}

async function list(limit: number, skip: number) {
  const users = await User.find({}, "_id profileImage username decks")
    .sort("id")
    .limit(limit)
    .skip(skip);
  console.log(users);
}

async function create({ userInfo }: { userInfo: any }) {
  if (!userInfo)
    throw new AppError(
      "Cannot create user. Missing fields",
      HttpStatus.BAD_REQUEST
    );
  const { email, password } = userInfo;
  const exist = await User.findOne({ email });
  if (exist) throw new Conflict("Email already exists");

  const created = await User.create({ email, password });
  return created;
}

async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });
  if (!user) throw new NotFound("User does not exist");
  // @ts-ignore
  const result = await user.compareHashPassword(password);
  if (!result) throw new Unauthorized();
  // if valid credientials, set sessionValid to true
  await User.findByIdAndUpdate(user._id, { $set: { sessionValid: true } });

  const accessToken = createAccessToken({ userId: user._id });
  const refreshToken = createRefreshToken({ userId: user._id });

  return { userId: user._id, accessToken, refreshToken };
}
