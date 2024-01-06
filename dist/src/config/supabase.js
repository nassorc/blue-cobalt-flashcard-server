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
exports.createImageURL = exports.uploadFile = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)("https://kvqassbuiawuchclcpwn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cWFzc2J1aWF3dWNoY2xjcHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNDIyODIsImV4cCI6MjAxODcxODI4Mn0.ZHURB-DxZ65vB_bfWCc4OzrcEm-pOohVtlrPktcdeog");
const uploadFile = (storage, path, fileBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
        .storage
        .from(storage)
        .upload(path, fileBody, {
        cacheControl: "3600",
        upsert: true
    });
    if (error) {
        return {
            data: null,
            error: new Error(error.message)
        };
    }
    return {
        data: data,
        error: null
    };
});
exports.uploadFile = uploadFile;
const createImageURL = (storage, path, expiresIn = 365 * 24 * 60 * 60) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
        .storage
        .from(storage)
        .createSignedUrl(path, expiresIn);
    if (error) {
        return {
            data: null,
            error: new Error(error.message)
        };
    }
    return {
        data: data,
        error: null
    };
});
exports.createImageURL = createImageURL;
exports.default = supabase;
