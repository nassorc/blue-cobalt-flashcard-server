"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
function generateId() {
    return require("crypto").randomBytes(10).toString("hex");
}
exports.generateId = generateId;
