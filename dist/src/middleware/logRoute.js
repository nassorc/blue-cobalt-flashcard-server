"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
function logRoute(req, res, next) {
    logger_1.default.debug(`${req.method} ${req.originalUrl}`);
    return next();
}
exports.default = logRoute;
