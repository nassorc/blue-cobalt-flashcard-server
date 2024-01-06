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
const buildServer_1 = require("./lib/buildServer");
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./config/logger"));
require("dotenv/config");
const Awards_1 = __importDefault(require("./app/awards/Awards"));
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        // create awards
        let awards = [
            {
                name: "Mastery",
                type: "deck",
                description: "Mastered All cards in a deck",
                code: 1000,
            },
            {
                name: "AI Generated",
                type: "deck",
                description: "Empowered deck with AI",
                code: 1001,
            },
            {
                name: "Beginnings",
                type: "user",
                description: "Practice once",
                code: 5000,
            },
        ];
        const session = yield mongoose_1.default.connection.startSession();
        session.startTransaction();
        yield mongoose_1.default.connection.startSession();
        yield Awards_1.default.collection.drop();
        for (const award of awards) {
            yield Awards_1.default.create(award);
        }
        yield session.commitTransaction();
        session.endSession();
    });
}
const PORT = process.env.PORT || 3001;
const server = (0, buildServer_1.buildServer)().listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`listening on port ${PORT}`);
    yield mongoose_1.default.connect(`${process.env.DATABSE_URI}`);
    yield initializeDatabase();
    logger_1.default.info("Connected to DB");
}));
