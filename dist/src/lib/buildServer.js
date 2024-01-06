"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildServer = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logger_1 = __importDefault(require("../config/logger"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const logRoute_1 = __importDefault(require("../middleware/logRoute"));
const globalErrorHandler_1 = __importDefault(require("../middleware/globalErrorHandler"));
function buildServer() {
    const app = (0, express_1.default)();
    app.use(express_1.default.static(path_1.default.join("/")));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, express_fileupload_1.default)());
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use(logRoute_1.default);
    app.get("/status", (req, res) => {
        logger_1.default.debug("checking status");
        return res.status(200).send({ status: "healthy" });
    });
    require("../routes")(app);
    app.use(globalErrorHandler_1.default);
    return app;
}
exports.buildServer = buildServer;
