"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.createRefreshToken = exports.createAccessToken = exports.sign = exports.signToken = void 0;
// @ts-nocheck
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
require("dotenv/config");
const errors_1 = require("../lib/errors");
function signToken(payload, key, options) {
    const token = jsonwebtoken_1.default.sign(payload, key, options);
    return token;
}
exports.signToken = signToken;
function sign(payload, opts) {
    const token = jsonwebtoken_1.default.sign(payload, opts.secret, {
        expiresIn: opts.ttl,
    });
    return token;
}
exports.sign = sign;
function createAccessToken(payload) {
    if (!process.env.AT_TTL) {
        throw new errors_1.ServerError("Access token TTL not defined");
    }
    return sign(payload, {
        ttl: process.env.AT_TTL,
        secret: process.env.AT_SECRET_KEY,
    });
}
exports.createAccessToken = createAccessToken;
function createRefreshToken(payload) {
    return sign(payload, {
        ttl: process.env.RT_TTL,
        secret: process.env.RT_SECRET_KEY,
    });
}
exports.createRefreshToken = createRefreshToken;
function verifyJWT(token, key) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, key);
        return {
            decoded,
            expired: false,
            valid: true,
        };
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
            const decoded = jsonwebtoken_1.default.decode(token);
            return {
                decoded: decoded,
                expired: true,
                valid: true,
            };
        }
        else {
            return {
                decoded: null,
                expired: false,
                valid: false,
            };
        }
    }
}
exports.verifyJWT = verifyJWT;
