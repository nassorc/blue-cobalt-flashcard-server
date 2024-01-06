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
exports.deckService = exports.gradeCard = exports.remove = exports.updateDeck = exports.getAllFlashcardDecks = exports.getOneFlashcardDeck = exports.create = exports.addNewFlashcard = void 0;
const supermemo_1 = require("supermemo");
const mongoose_1 = __importDefault(require("mongoose"));
const Deck_1 = __importDefault(require("./Deck"));
const user_usecases_1 = require("../user/user.usecases");
const errors_1 = require("../../lib/errors");
const supabase_1 = __importStar(require("../../config/supabase"));
const Task_1 = __importDefault(require("../task/Task"));
const Users_1 = __importDefault(require("../user/Users"));
const logger_1 = __importDefault(require("../../config/logger"));
function addNewFlashcard(deckId, cardInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Users_1.default.findOneAndUpdate({ _id: deckId }, { $push: { cards: cardInfo } });
    });
}
exports.addNewFlashcard = addNewFlashcard;
function create(deckInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield user_usecases_1.userService.query(deckInfo.owner);
        if (!exists) {
            logger_1.default.debug("Cannot create deck. User does not exist");
            throw new errors_1.NotFound("User does not exist");
        }
        const deck = new Deck_1.default({
            deckName: deckInfo.deckName,
            owner: deckInfo.owner,
            taskStatus: "pending",
            blurhash: deckInfo.blurhash,
        });
        yield deck.save();
        yield Users_1.default.findOneAndUpdate({ _id: deckInfo.owner }, { $push: { decks: deck._id } });
        const task = new Task_1.default({
            deckId: deck._id,
        });
        yield task.save();
        const taskId = task._id;
        try {
            let imagePath = "";
            let imageURL = "";
            let blurhash = deckInfo.blurhash;
            const doThing = () => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                // upload deck image
                yield Task_1.default.findOneAndUpdate({ _id: taskId }, { $push: { tasks: "Uploading Image" } });
                if ("deckImageFile" in deckInfo) {
                    // convert file upload to blob
                    const deckImageStoragePath = `/public/${deck._id}`;
                    const imageBlob = new Blob([(_a = deckInfo === null || deckInfo === void 0 ? void 0 : deckInfo.deckImageFile) === null || _a === void 0 ? void 0 : _a.data], {
                        type: (_b = deckInfo === null || deckInfo === void 0 ? void 0 : deckInfo.deckImageFile) === null || _b === void 0 ? void 0 : _b.mimetype,
                    });
                    const bucket = "deck_images";
                    const { error, data } = yield (0, supabase_1.uploadFile)(bucket, `/public/${deck._id}`, imageBlob);
                    if (error) {
                        throw new errors_1.ServerError("Could not upload image");
                    }
                    const { data: signedURL, error: signedError } = yield (0, supabase_1.createImageURL)(bucket, `/public/${deck._id}`);
                    if (signedError) {
                        // console.error("error", signedError.message)
                        throw new errors_1.ServerError(signedError.message);
                    }
                    imagePath = data.path;
                    imageURL = signedURL.signedUrl;
                }
                if (deckInfo.aiAssist) {
                    yield Task_1.default.findOneAndUpdate({ _id: taskId }, { $push: { tasks: "AI generating flash cards." } });
                }
                yield Task_1.default.findOneAndUpdate({ _id: taskId }, { $push: { tasks: "Saving Deck." } });
                yield Deck_1.default.findOneAndUpdate({ _id: task.deckId }, {
                    deckImage: imageURL,
                    deckImageName: imagePath,
                    blurhash: blurhash,
                    taskStatus: "complete",
                });
                yield Task_1.default.findOneAndUpdate({ _id: taskId }, {
                    $push: { tasks: "Task complete." },
                    $set: { isPending: false },
                });
            });
            doThing();
            return { taskId: taskId };
        }
        catch (err) {
            yield Task_1.default.findOneAndUpdate({ _id: taskId }, {
                $push: { tasks: "Task complete." },
                $set: {
                    isPending: false,
                    success: false,
                    errorMessage: "something went wrong.",
                },
            });
            yield Deck_1.default.findOneAndUpdate({ id: task.deckId }, {
                $set: {
                    taskStatus: "failed",
                },
            });
            logger_1.default.error("task error", err);
        }
    });
}
exports.create = create;
function getOneFlashcardDeck(deckId) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = new mongoose_1.default.mongo.ObjectId(deckId);
        const deckList = yield Deck_1.default.findOne({ _id: id });
        return deckList;
    });
}
exports.getOneFlashcardDeck = getOneFlashcardDeck;
function getAllFlashcardDecks(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = new mongoose_1.default.mongo.ObjectId(userId);
        const deckList = yield Deck_1.default.find({ owner: id });
        return deckList;
    });
}
exports.getAllFlashcardDecks = getAllFlashcardDecks;
function updateDeck(deckId, deckInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Deck_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(deckId) }, { $set: deckInfo });
    });
}
exports.updateDeck = updateDeck;
function remove(deckId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield supabase_1.default.storage.from("deck_images").remove([`public/${deckId}`]);
        yield Deck_1.default.deleteOne({ _id: deckId });
    });
}
exports.remove = remove;
function gradeCard({ deckId, cardId, grade }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.debug("Grading card");
            const foundDeck = yield Deck_1.default.findOne({ _id: deckId, "cards._id": cardId }, { cards: { $elemMatch: { _id: cardId } } });
            if (!foundDeck) {
                throw new errors_1.NotFound("Flashcard not found");
            }
            // extract data to update due data
            const card = foundDeck.cards[0];
            logger_1.default.debug(`from ${card}`);
            const stats = {
                interval: card.interval,
                repetition: card.repetition,
                efactor: card.efactor,
                status: card.status,
            };
            // insert data to algorithm
            const { interval, repetition, efactor } = (0, supermemo_1.supermemo)(stats, grade);
            const reviewedDate = new Date();
            let date = new Date();
            let dueDate = new Date();
            // set new due date
            dueDate.setDate(date.getDate() + interval);
            // if card type is new, set to reviewed
            if (stats.status === "new" && interval > 0) {
                // update data
                yield Deck_1.default.findOneAndUpdate({ _id: deckId, "cards._id": cardId }, {
                    $set: {
                        "cards.$.interval": interval,
                        "cards.$.repetition": repetition,
                        "cards.$.efactor": efactor,
                        "cards.$.status": "reviewed",
                        "cards.$.reviewedDate": reviewedDate.toISOString(),
                        "cards.$.dueDate": dueDate.toISOString(),
                    },
                    $push: { reviewList: cardId },
                });
            }
            else {
                // update data
                yield Deck_1.default.findOneAndUpdate({ _id: deckId, "cards._id": cardId }, {
                    $set: {
                        "cards.$.interval": interval,
                        "cards.$.repetition": repetition,
                        "cards.$.efactor": efactor,
                        "cards.$.reviewedDate": reviewedDate.toISOString(),
                        "cards.$.dueDate": dueDate.toISOString(),
                    },
                });
            }
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.gradeCard = gradeCard;
exports.deckService = {
    addNewFlashcard: addNewFlashcard,
    createNewFlashcardDeck: create,
    getOneFlashcardDeck: getOneFlashcardDeck,
    getAllFlashcardDecks: getAllFlashcardDecks,
    updateDeck: updateDeck,
    removeDeck: remove,
    gradeCard: gradeCard,
};
