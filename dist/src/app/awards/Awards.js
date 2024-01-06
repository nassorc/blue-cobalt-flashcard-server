"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AwardsSchema = new mongoose_1.default.Schema({
    name: { type: mongoose_1.default.Schema.Types.String },
    description: { type: mongoose_1.default.Schema.Types.String, default: "" },
    code: { type: mongoose_1.default.Schema.Types.Number },
});
const AwardsModel = mongoose_1.default.model("awards", AwardsSchema);
exports.default = AwardsModel;
