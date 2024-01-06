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
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const Schema_1 = require("./Schema");
const awards_usecase_1 = require("./awards.usecase");
let router = (0, express_1.Router)();
router.post("/award/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { awardId, userId }, } = yield (0, validateRequest_1.default)(Schema_1.UserAwardInputSchema, req);
    yield awards_usecase_1.awardsService.awardUser({ awardId, userId });
}));
router.post("/award/deck", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { awardId, deckId }, } = yield (0, validateRequest_1.default)(Schema_1.deckAwardInputSchema, req);
    yield awards_usecase_1.awardsService.awardDeck({ awardId, deckId });
}));
exports.default = router;
