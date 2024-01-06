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
Object.defineProperty(exports, "__esModule", { value: true });
// all controllers can use.
function makeControllerHandler(controller) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const httpRequest = {
                body: req.body,
                query: req.query,
                params: req.params,
                method: req.method,
                path: req.path,
                headers: {
                    "Content-Type": req.get("Content-Type"),
                    Referer: req.get("referer"),
                },
            };
            try {
                const httpResponse = yield controller(httpRequest);
                if (httpResponse.cookies) {
                    httpResponse.cookies.forEach((cookie) => {
                        Object.entries(cookie).forEach(([key, value]) => {
                            res.cookie(key, value.value, {
                                httpOnly: value.httpOnly,
                                maxAge: value.maxAge,
                            });
                        });
                    });
                }
                if (httpResponse.headers) {
                    res.set(httpRequest.headers);
                }
                res.type("json");
                return res.status(httpResponse.statusCode).send(httpResponse.body);
            }
            catch (err) {
                next(err);
            }
        });
    };
}
exports.default = makeControllerHandler;
