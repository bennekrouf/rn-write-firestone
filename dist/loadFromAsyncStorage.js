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
exports.loadFromAsyncStorage = void 0;
const async_storage_1 = __importDefault(require("@react-native-community/async-storage"));
const getStorageKey_1 = require("./utils/getStorageKey");
const loadFromAsyncStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storageKey = yield (0, getStorageKey_1.getStorageKey)();
        console.log(`RN Loading from AsyncStorage with key : ${storageKey}`);
        const dataString = yield async_storage_1.default.getItem(storageKey);
        if (dataString) {
            return JSON.parse(dataString); // Convert string back to object
        }
        else {
            console.log('No data found for the given storageKey in AsyncStorage.');
            return undefined; // or any default value you'd like to return
        }
    }
    catch (error) {
        console.error("An error occurred:", error.message);
        console.log("Please ensure you have read/write permissions for AsyncStorage and the key exists.");
    }
});
exports.loadFromAsyncStorage = loadFromAsyncStorage;
