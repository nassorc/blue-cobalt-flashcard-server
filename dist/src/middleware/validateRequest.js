"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../lib/errors");
function validateRequest(schema, req) {
    try {
        return schema.parseAsync(req);
    }
    catch (err) {
        throw new errors_1.BadRequest(err.message);
    }
}
exports.default = validateRequest;
