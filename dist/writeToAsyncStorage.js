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
const getUser_1 = require("./getUser");
const writeToAsyncStorage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, getUser_1.getUser)();
    try {
        // Retrieve current data from AsyncStorage
        const existingDataString = yield async_storage_1.default.getItem('user');
        const existingData = existingDataString ? JSON.parse(existingDataString) : {};
        // Merge existing AsyncStorage data with the new data being provided
        const mergedData = Object.assign(Object.assign({}, existingData), data);
        // Saving merged data to AsyncStorage
        yield async_storage_1.default.setItem('user', JSON.stringify(mergedData));
        console.log('Data merged and stored in AsyncStorage.');
    }
    catch (error) {
        console.error("Error fetching or merging data", error);
    }
    return user;
});
exports.writeToAsyncStorage = writeToAsyncStorage;
