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
const getKey_1 = require("./getKey");
const writeToAsyncStorage = (key, data) => __awaiter(void 0, void 0, void 0, function* () {
    const userKey = yield (0, getKey_1.getKey)();
    try {
        // Retrieve current data from AsyncStorage
        const existingDataString = yield async_storage_1.default.getItem(userKey);
        const existingData = existingDataString ? JSON.parse(existingDataString) : {};
        // Merge existing AsyncStorage data with the new data being provided
        const mergedData = Object.assign(Object.assign({}, existingData), data);
        // Saving merged data to AsyncStorage
        yield async_storage_1.default.setItem(userKey, JSON.stringify({ [key]: JSON.stringify(mergedData) }));
        console.log(`Data merged and stored in AsyncStorage ${yield async_storage_1.default.getItem(userKey)}`);
    }
    catch (error) {
        console.error("RNNNN Error fetching or merging data writeToAsyncStorage", error);
    }
    return true;
});
exports.writeToAsyncStorage = writeToAsyncStorage;
