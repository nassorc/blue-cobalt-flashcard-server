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
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const Schema_1 = require("./Schema");
const user_usecases_1 = require("./user.usecases");
const httpStatus_1 = __importDefault(require("../../lib/httpStatus"));
require("dotenv/config");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(httpStatus_1.default.OK);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: user } = yield (0, validateRequest_1.default)(Schema_1.LoginInputSchema, req);
    yield user_usecases_1.userService.create({ userInfo: req.body });
    res.status(httpStatus_1.default.CREATED).send({ message: "created" });
}));
router.get("/me", validateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const user = yield user_usecases_1.userService.query(id);
    res.status(httpStatus_1.default.OK).send(user);
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: credentials } = yield (0, validateRequest_1.default)(Schema_1.LoginInputSchema, req);
    const { userId, accessToken, refreshToken } = yield user_usecases_1.userService.authenticate(credentials);
    // TODO: User set age through env variables
    res.cookie("accessToken", accessToken, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 50,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 50,
    });
    res.status(httpStatus_1.default.OK).send({ userId });
}));
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    const accessToken = cookies["accessToken"];
    const refreshToken = cookies["refreshToken"];
    if (!accessToken && !refreshToken) {
        return res.sendStatus(204); // no content
    }
    else {
        if (accessToken && accessToken.length > 0) {
            res.clearCookie("accessToken");
        }
        if (refreshToken && refreshToken.length > 0) {
            res.clearCookie("refreshToken", { httpOnly: true });
        }
        // await UserModel.findByIdAndUpdate(decoded.decoded.userId, {
        //   $set: { sessionValid: false },
        // });
        return res.sendStatus(200);
    }
}));
router.get("/token/validate", (req, res) => {
    res.status(200).send({ valid: true });
});
exports.default = router;
