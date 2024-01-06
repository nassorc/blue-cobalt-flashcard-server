"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Users_1 = __importDefault(require("./Users"));
const errors_1 = require("../../lib/errors");
const jwt_1 = require("../../utils/jwt");
const httpStatus_1 = __importDefault(require("../../lib/httpStatus"));
exports.userService = ((User) => {
    return {
        query: query,
        create: create,
        authenticate: authenticate,
        list: list,
    };
})(Users_1.default);
function hasDeckPriveleges() {
    return __awaiter(this, void 0, void 0, function* () { });
}
function isAuthenticated() {
    return __awaiter(this, void 0, void 0, function* () { });
}
function query(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield Users_1.default.findOne({ _id: new mongoose_1.default.Types.ObjectId(userId) }, "_id email firstName lastName username deck userPhoto profileImage decks").populate("decks");
        return user;
    });
}
function list(limit, skip) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield Users_1.default.find({}, "_id profileImage username decks")
            .sort("id")
            .limit(limit)
            .skip(skip);
        console.log(users);
    });
}
function create({ userInfo }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!userInfo)
            throw new errors_1.AppError("Cannot create user. Missing fields", httpStatus_1.default.BAD_REQUEST);
        const { email, password } = userInfo;
        const exist = yield Users_1.default.findOne({ email });
        if (exist)
            throw new errors_1.Conflict("Email already exists");
        const created = yield Users_1.default.create({ email, password });
        return created;
    });
}
function authenticate({ email, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield Users_1.default.findOne({ email });
        if (!user)
            throw new errors_1.NotFound("User does not exist");
        // @ts-ignore
        const result = yield user.compareHashPassword(password);
        if (!result)
            throw new errors_1.Unauthorized();
        // if valid credientials, set sessionValid to true
        yield Users_1.default.findByIdAndUpdate(user._id, { $set: { sessionValid: true } });
        const accessToken = (0, jwt_1.createAccessToken)({ userId: user._id });
        const refreshToken = (0, jwt_1.createRefreshToken)({ userId: user._id });
        return { userId: user._id, accessToken, refreshToken };
    });
}
