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
exports.getKey = void 0;
const getUser_1 = require("../getUser");
const mayo_logger_1 = require("mayo-logger");
const getKey = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mayo_logger_1.Logger.info("Fetching user...");
        const user = yield (0, getUser_1.getUser)();
        mayo_logger_1.Logger.info(`Fetched user with UID: ${user === null || user === void 0 ? void 0 : user.uid}`);
        return `${user === null || user === void 0 ? void 0 : user.uid}`;
    }
    catch (err) {
        mayo_logger_1.Logger.error("Failed to fetch user:", err);
        throw err;
    }
});
exports.getKey = getKey;
