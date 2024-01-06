"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.Conflict = exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BadRequest = exports.AppError = void 0;
const httpStatus_1 = __importDefault(require("./httpStatus"));
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
class BadRequest extends AppError {
    constructor(message = "Bad Request", status = httpStatus_1.default.BAD_REQUEST) {
        super(message, status);
    }
}
exports.BadRequest = BadRequest;
class Unauthorized extends AppError {
    constructor(message = "Unauthorized", status = httpStatus_1.default.UNAUTHORIZED) {
        super(message, status);
    }
}
exports.Unauthorized = Unauthorized;
class Forbidden extends AppError {
    constructor(message = "Forbidden", status = httpStatus_1.default.FORBIDDEN) {
        super(message, status);
    }
}
exports.Forbidden = Forbidden;
class NotFound extends AppError {
    constructor(message = "Not Found", status = httpStatus_1.default.NOT_FOUND) {
        super(message, status);
    }
}
exports.NotFound = NotFound;
class Conflict extends AppError {
    constructor(message = "Confict", status = httpStatus_1.default.CONFLICT) {
        super(message, status);
    }
}
exports.Conflict = Conflict;
class ServerError extends AppError {
    constructor(message = "Server Error", status = httpStatus_1.default.SERVER_ERROR) {
        super(message, status);
    }
}
exports.ServerError = ServerError;
