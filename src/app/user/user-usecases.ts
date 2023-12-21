import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./Users";
import AppError from "../../lib/error/AppError";
import httpStatus from "../../config/httpStatus";
import { createAccessToken, createRefreshToken } from "../../utils/jwt";

export const userService = ((User) => {
  return {
    query: query,
    create: create,
    authenticate: authenticate(User),
    list: list,
  };
})(User);

async function query(userId) {
  const user = await User.findOne(
    { _id: new mongoose.Types.ObjectId(userId) },
    "_id email firstName lastName username deck userPhoto profileImage decks"
  ).populate("decks");
  return user;
}

async function list(limit, skip) {
  const users = await User.find({}, "_id profileImage username decks")
    .sort("id")
    .limit(limit)
    .skip(skip);
  console.log(users);
}

async function create({ userInfo }) {
  if (!userInfo)
    throw new AppError(
      "Cannot create user. Missing fields",
      httpStatus.BAD_REQUEST
    );
  const { email, password } = userInfo;
  const exist = await User.findOne({ email });
  if (exist) throw new AppError("Email already exists", httpStatus.CONFLICT);

  const created = await User.create({ email, password });
  return created;
}

function authenticate(User) {
  return async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("User does not exist", httpStatus.NOT_FOUND);

    const result = await user.compareHashPassword(password);
    console.log("ResULT", result);
    if (!result) throw new AppError("Unauthorized", httpStatus.UNAUTHORIZED);
    // if valid credientials, set sessionValid to true
    await User.findByIdAndUpdate(user._id, { $set: { sessionValid: true } });

    const accessToken = createAccessToken({ userId: user._id });
    const refreshToken = createRefreshToken({ userId: user._id });

    // User.findByIdAndUpdate(user._id, { $set: { sessionValid: false } });
    return { userId: user._id, accessToken, refreshToken };
  };
}
