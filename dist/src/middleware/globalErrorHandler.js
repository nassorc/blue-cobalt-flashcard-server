"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../lib/errors");
const logger_1 = __importDefault(require("../config/logger"));
const httpStatus_1 = __importDefault(require("../lib/httpStatus"));
function globalErrorHandler(err, req, res, next) {
    logger_1.default.error(err.message);
    if (err instanceof errors_1.AppError) {
        // response sent
        if (res.headersSent) {
            next(err);
        }
        err.statusCode = err.statusCode || 500;
        res.status(err.statusCode).json({
            error: {
                status: err.statusCode,
                message: err.message,
            },
        });
    }
    res.status(httpStatus_1.default.SERVER_ERROR).json({
        error: {
            status: httpStatus_1.default.SERVER_ERROR,
            message: err.message,
        },
    });
}
exports.default = globalErrorHandler;
