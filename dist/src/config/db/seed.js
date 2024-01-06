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
exports.users = void 0;
const faker_1 = require("@faker-js/faker");
const Users_1 = __importDefault(require("../../app/user/Users"));
const Deck_1 = __importDefault(require("../../app/deck/Deck"));
function createUser() {
    return {
        username: faker_1.faker.internet.userName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
    };
}
function createDeck({ userId }) {
    return {
        deckName: "test deck",
        owner: userId,
        cards: [
            {
                front: "front",
                back: "back",
                status: "reviewed",
                interval: 1,
                repetition: 1,
                efactor: 2.5,
            },
        ],
        deckImage: faker_1.faker.image.avatar,
        deckImageName: faker_1.faker.string.sample(),
        blurhash: faker_1.faker.string.sample(),
        deckSettings: {
            reviewCards: 10,
            newCards: 5,
            visibility: "public",
        },
    };
}
let users = [];
exports.users = users;
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 3; i++) {
            let user = createUser();
            let createdUser = yield Users_1.default.create(user);
            let deck = yield Deck_1.default.create(createDeck({ userId: createdUser._id.toString() }));
            users.push(Object.assign(Object.assign({}, user), { _id: createdUser.toJSON()._id.toString() }));
        }
    });
}
exports.default = seed;
