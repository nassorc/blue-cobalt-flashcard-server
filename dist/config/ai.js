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
const openai_1 = __importDefault(require("openai"));
let ai = {};
const openai = new openai_1.default({
    apiKey: "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",
});
ai.generateFlashcards = function (prompt) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-3.5-turbo",
        });
        if (res.choices[0] &&
            res.choices[0].message &&
            res.choices[0].message.content) {
            const data = JSON.parse(yield ((_b = (_a = res.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content));
        }
    });
};
// const openai = new OpenAIApi(new Configuration({
//   apiKey: "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"
// }))
//
// let msg: ChatCompletionRequestMessage = {
//   role: ChatCompletionRequestMessageRoleEnum.System,
//   content: "write me a short story"
// }
//
//
// openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [msg],
//   temperature: 0
// }).then(res => {
//   console.log(JSON.parse(res.data.choices[0].message.content))
// }).catch(err => console.log(err.response.data))
