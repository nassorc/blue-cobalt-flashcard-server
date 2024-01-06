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
const mongoose_1 = __importStar(require("mongoose"));
const cardSchema = new mongoose_1.default.Schema({
    front: { type: String },
    back: { type: String },
    cardImage: { type: String, default: "" },
    status: {
        type: String,
        enum: ["new", "learning", "mastered"],
        default: "new",
    },
    interval: { type: Number, default: 0 },
    repetition: { type: Number, default: 0 },
    efactor: { type: Number, default: 2.5 },
    createdAt: { type: Date, default: new Date().toISOString() },
    reviewedDate: { type: Date, default: null },
    dueDate: { type: Date, default: null },
    deckImage: { type: String },
    deckImageName: { type: String },
    blurhash: { type: String },
});
const deckSettingsSchema = new mongoose_1.default.Schema({
    reviewCards: { type: Number, default: 10 },
    newCards: { type: Number, default: 5 },
    visibility: { type: String, default: "private" },
});
const DeckSchema = new mongoose_1.default.Schema({
    deckName: { type: String, require: true },
    owner: { type: mongoose_1.Types.ObjectId, required: true },
    cards: { type: [cardSchema] },
    reviewList: { type: [mongoose_1.Types.ObjectId], default: [] },
    deckImage: { type: String },
    deckImageName: { type: String },
    blurhash: { type: String },
    createdAt: { type: Date, default: new Date().toISOString() },
    tags: { type: [String] },
    deckSettings: { type: deckSettingsSchema },
    taskStatus: {
        type: String,
        enum: ["pending", "complete", "failed"],
        default: "complete",
    },
});
const Deck = mongoose_1.default.model("decks", DeckSchema);
exports.default = Deck;
