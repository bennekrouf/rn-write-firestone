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
exports.writeToAsyncStorage = void 0;
const async_storage_1 = __importDefault(require("@react-native-community/async-storage"));
const getAppName_1 = require("./getAppName");
const getKey_1 = require("./getKey");
const writeToAsyncStorage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, getAppName_1.getAppName)();
    const key = yield (0, getKey_1.getKey)();
    const appCollection = app === null || app === void 0 ? void 0 : app.toLocaleLowerCase();
    const storageKey = `${appCollection}:${key}`; // Formulating a unique key
    console.log(`Try to persist storageKey : ${storageKey} Value : ${JSON.stringify(data)}`);
    try {
        yield async_storage_1.default.setItem(storageKey, JSON.stringify(data));
        console.log('Data successfully saved to AsyncStorage');
    }
    catch (error) {
        console.error("An error occurred:", error.message);
    }
});
exports.writeToAsyncStorage = writeToAsyncStorage;
