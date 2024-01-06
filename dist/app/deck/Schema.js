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
exports.GradeCardInputSchema = exports.GetTaskInputSchema = exports.DeckInputSchema = exports.ImageFileSchema = exports.cardShema = exports.DeckShema = void 0;
const z = __importStar(require("zod"));
const DeckSettingsSchema = z.object({
    newCards: z.number(),
    reviewCards: z.number(),
    isPublic: z.boolean(),
});
exports.DeckShema = z.object({
    deckName: z.string(),
    owner: z.string(),
    deckImage: z.string(),
    deckImageName: z.string(),
    blurhash: z.string(),
    tag: z.array(z.string()),
    aiAssist: z.boolean(),
});
exports.cardShema = z.object({
    front: z.string(),
    back: z.string(),
    status: z.enum(["new", "reviewed"]),
    interval: z.string(),
    repetition: z.number(),
    efactor: z.number(),
    createdAt: z.date(),
    reviewedDate: z.date(),
    dueDate: z.date(),
    deckImage: z.string(),
    deckImageName: z.string(),
    blurhash: z.string(),
});
exports.ImageFileSchema = z.object({
    deckImageFile: z.object({
        data: z.any(),
        name: z.string(),
        mimetype: z.string(),
    }),
});
exports.DeckInputSchema = z.object({
    body: exports.DeckShema.pick({
        deckName: true,
        aiAssist: true,
        blurhash: true,
    }).merge(DeckSettingsSchema),
});
exports.GetTaskInputSchema = z.object({
    params: z.object({
        deckId: z.string(),
    }),
});
exports.GradeCardInputSchema = z.object({
    body: z.object({
        grade: z.number().min(0).max(5),
    }),
});
