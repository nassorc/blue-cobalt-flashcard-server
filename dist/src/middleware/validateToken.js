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
const logger_1 = __importDefault(require("../config/logger"));
const Users_1 = __importDefault(require("../app/user/Users"));
const errors_1 = require("../lib/errors");
// import { signToken, verifyToken } from "../lib/jwt";
const jwt_1 = require("../utils/jwt");
const httpStatus_1 = __importDefault(require("../lib/httpStatus"));
const at_key = "accessToken";
const rt_key = "refreshToken";
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let accessToken = req.cookies[at_key];
    let refreshToken = req.cookies[rt_key];
    logger_1.default.debug("validating");
    if (!accessToken || !refreshToken) {
        next(new errors_1.AppError("No valid tokens provided", httpStatus_1.default.UNAUTHORIZED));
    }
    if (!process.env.AT_SECRET_KEY || !process.env.RT_SECRET_KEY) {
        logger_1.default.error("missing access or refresh token env variables");
        next(new errors_1.ServerError("Missing env variables"));
    }
    const decodedAccessToken = (0, jwt_1.verifyJWT)(accessToken, process.env.AT_SECRET_KEY || "");
    // if access token is expired
    if (decodedAccessToken.expired) {
        const decodeRefreshToken = (0, jwt_1.verifyJWT)(refreshToken, process.env.RT_SECRET_KEY || "");
        // if both access and refresh token are expired
        if (decodeRefreshToken.expired) {
            // set user session to invalid
            yield Users_1.default.findByIdAndUpdate(decodeRefreshToken.decoded.userId, {
                $set: { sessionValid: false },
            });
            next(new errors_1.AppError("Refresh token Expired", 401));
        }
        else if (!decodeRefreshToken.valid) {
            next(new errors_1.AppError("Invalid Refresh token", 401));
        }
        // valid refresh token
        const sessionValid = yield ((_b = (yield (Users_1.default === null || Users_1.default === void 0 ? void 0 : Users_1.default.findById((_a = decodeRefreshToken === null || decodeRefreshToken === void 0 ? void 0 : decodeRefreshToken.decoded) === null || _a === void 0 ? void 0 : _a.userId, "sessionValid")))) === null || _b === void 0 ? void 0 : _b.sessionValid);
        if (!sessionValid) {
            next(new errors_1.AppError("Invalid session", 401));
        }
        // if valid refresh token, reissue access token
        logger_1.default.info("Session valid, reissuing Access token");
        const reIssuedAccessToken = (0, jwt_1.signToken)({ userId: decodeRefreshToken.decoded.userId }, process.env.AT_SECRET_KEY || "", { expiresIn: process.env.AT_TTL });
        res.clearCookie(at_key);
        res.cookie(at_key, reIssuedAccessToken);
        // token reissued, call next()
        req.body = Object.assign(req.body, {
            locals: { userId: decodeRefreshToken.decoded.userId },
        });
    }
    else if (!decodedAccessToken.valid) {
        next(new errors_1.AppError("Invalid Access Token", 401));
    }
    else {
        // @ts-ignore
        req.user = {};
        Object.assign(req.user, {
            id: decodedAccessToken.decoded.userId,
        });
    }
    next();
});
exports.default = validateToken;
