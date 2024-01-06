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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const buildServer_1 = require("../../src/lib/buildServer");
const httpStatus_1 = __importDefault(require("../../src/lib/httpStatus"));
const Users_1 = __importDefault(require("../../src/app/user/Users"));
const testServer_1 = __importDefault(require("../helpers/testServer"));
let mongodb;
let testUser;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongodb = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongodb.getUri();
    mongoose_1.default.connect(uri);
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    let user = {
        email: "test@gmail.com",
        password: "test123",
    };
    let created = yield Users_1.default.create(user);
    let res = yield Users_1.default.find({
        _id: created._id,
    });
    testUser = res[0].toJSON();
    testUser.rawPassword = user.password;
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropCollection("users");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield mongodb.stop();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongodb.stop();
}));
// describe("test memory server", () => {
//   it("should create a user", async () => {
//     const res = await request(buildServer()).post("/user/test/create").send({});
//     expect(res.status).toBe(HttpStatus.CREATED);
//     expect(res.body).toHaveProperty("user");
//   });
//   it("should get a user", async () => {
//     const res = await request(buildServer()).get("/user/test/get").send();
//     expect(res.status).toBe(HttpStatus.OK);
//     expect(res.body).toBe({});
//   });
// });
function parseCookies(headers) {
    var _a;
    return Object.fromEntries(((_a = headers
        .get("set-cookie")) === null || _a === void 0 ? void 0 : _a.split(",").map((entry) => entry.split(";")).filter((elms) => elms.join("").includes("=")).map((elms) => elms[0]).map((elms) => elms.split("="))) || []);
}
describe("deck integration", () => {
    describe("POST /deck/:deckId/card/:cardId/grade", () => {
        describe("given valid `deckId` and `cardId` request params", () => {
            it("should respond with a 200", () => {
                expect(true).toBe(true);
            });
        });
        describe("given valid payload", () => {
            it("should call DeckService.gradeCard once", () => {
                expect(true).toBe(true);
            });
            it("should call DeckService.gradeCard once", () => {
                expect(true).toBe(true);
            });
            it("should call the practice function once", () => {
                expect(true).toBe(true);
            });
            it("should update the database", () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(testServer_1.default).post("/user/login").send({
                    email: testUser.email,
                    password: testUser.rawPassword,
                });
                let header = new Headers(response.header);
                const cookies = parseCookies(header);
                const me = yield (0, supertest_1.default)(testServer_1.default)
                    .get("/user/me")
                    .set("Cookie", `accessToken=${cookies["accessToken"]};refreshToken=${cookies["refreshToken"]}`)
                    .withCredentials(true)
                    .send();
                console.log(yield me.body);
                expect(true).toBe(false);
            }));
        });
    });
    describe("POST /deck/", () => {
        describe("given valid payload", () => {
            it("should respond with a 201", () => {
                expect(true).toBe(true);
            });
            it("should create a task entry in the database", () => {
                expect(true).toBe(true);
            });
            it("should call DeckService.create once", () => {
                expect(true).toBe(true);
            });
            it("should create a deck entry in the database", () => {
                expect(true).toBe(true);
            });
        });
        describe("given payload contains a deck image", () => {
            it("upload the image", () => {
                expect(true).toBe(true);
            });
        });
        describe("given aiAssist is set to true on the payload", () => {
            it("should call the AI handler once", () => {
                expect(true).toBe(true);
            });
            it("should generate flashcards", () => {
                expect(true).toBe(true);
            });
            it("should save the generated flashcards in the database", () => {
                expect(true).toBe(true);
            });
        });
    });
});
describe("Server Status", () => {
    describe("GET /status", () => {
        describe("server is functional", () => {
            it("should return true", () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)((0, buildServer_1.buildServer)()).get("/status").send();
                expect(response.status).toBe(httpStatus_1.default.OK);
            }));
        });
    });
});
