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
exports.getStorageKey = void 0;
const getAppName_1 = require("./getAppName");
const getKey_1 = require("./getKey");
const rn_logging_1 = require("rn-logging");
const getStorageKey = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        rn_logging_1.Logger.info("Fetching application name...");
        const app = (0, getAppName_1.getAppName)();
        rn_logging_1.Logger.info("Fetching key...");
        const key = yield (0, getKey_1.getKey)();
        if (!app) {
            rn_logging_1.Logger.warn("Application name not retrieved. It might be undefined or null.");
        }
        const appCollection = app === null || app === void 0 ? void 0 : app.toLocaleLowerCase();
        const storageKey = `${appCollection}:${key}`;
        rn_logging_1.Logger.info(`Constructed storage key: ${storageKey}`);
        return storageKey;
    }
    catch (err) {
        rn_logging_1.Logger.error("Failed to construct storage key:", err);
        throw err;
    }
});
exports.getStorageKey = getStorageKey;
