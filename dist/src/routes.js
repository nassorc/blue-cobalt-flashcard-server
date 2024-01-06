"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deck_route_1 = __importDefault(require("./app/deck/deck.route"));
const user_route_1 = __importDefault(require("./app/user/user.route"));
const errors_1 = require("./lib/errors");
module.exports = (app) => {
    app.use("/deck", deck_route_1.default);
    app.use("/user", user_route_1.default);
    app.all("*", (req, res, next) => {
        next(new errors_1.AppError("Route not found", 404));
    });
};
