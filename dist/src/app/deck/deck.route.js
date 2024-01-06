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
const express_1 = __importDefault(require("express"));
const validateToken_1 = __importDefault(require("../../middleware/validateToken"));
const Task_1 = __importDefault(require("../task/Task"));
const deck_usecases_1 = require("./deck.usecases");
const httpStatus_1 = __importDefault(require("../../lib/httpStatus"));
const router = express_1.default.Router();
const Schema_1 = require("./Schema");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
router.get("/:deckId/task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { deckId }, } = yield (0, validateRequest_1.default)(Schema_1.GetTaskInputSchema, req);
    const taskData = yield Task_1.default.findOne({
        deckId: deckId,
    });
    res.status(200).send(taskData);
}));
router.post("/", validateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let tempBody = {};
    for (const [key, value] of Object.entries(req.body)) {
        if (typeof key === "string") {
            tempBody[key] = JSON.parse(value);
        }
    }
    Object.assign(req.body, tempBody);
    const { body } = yield (0, validateRequest_1.default)(Schema_1.DeckInputSchema, req);
    const { id } = req.user;
    const response = yield deck_usecases_1.deckService.createNewFlashcardDeck(Object.assign(Object.assign({}, body), { owner: id, deckImageFile: (_a = req.files) === null || _a === void 0 ? void 0 : _a.deckImage }));
    res.status(httpStatus_1.default.CREATED).send(response);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deckList = yield deck_usecases_1.deckService.getAllFlashcardDecks(req.params.id);
}));
router.get("/get/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deckList = yield deck_usecases_1.deckService.getOneFlashcardDeck(req.params.id);
    // return createResponse(httpStatus.SUCCESS, {deckList})
}));
router.delete("/delete/:id", validateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("deleting deck", id);
    yield deck_usecases_1.deckService.removeDeck(id);
    res.sendStatus(200);
}));
router.post("/:deckId/card/:cardId/grade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deckId, cardId } = req.params;
    const { body: { grade }, } = yield (0, validateRequest_1.default)(Schema_1.GradeCardInputSchema, req);
    yield deck_usecases_1.deckService.gradeCard({ deckId, cardId, grade });
    res.sendStatus(httpStatus_1.default.OK);
}));
router.post("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield deck_usecases_1.deckService.updateDeck(req.params.id, req.body.details);
    // return createResponse(httpStatus.SUCCESS, {message:'updated'})
}));
router.post("/cards", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    yield deck_usecases_1.deckService.addNewFlashcard((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.deckId, (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.cards);
    // return createResponse(httpStatus.SUCCESS, {message: 'card added'})
}));
exports.default = router;
