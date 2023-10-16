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
const rn_logging_1 = require("rn-logging");
const getStorageKey_1 = require("./utils/getStorageKey");
const writeToAsyncStorage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const storageKey = yield (0, getStorageKey_1.getStorageKey)();
    rn_logging_1.Logger.info('Attempting to persist data to AsyncStorage', { storageKey, data }, { tag: 'AsyncStorage', timestamp: true });
    try {
        yield async_storage_1.default.setItem(storageKey[data], JSON.stringify(data));
        rn_logging_1.Logger.info('Data successfully saved to AsyncStorage', null, { tag: 'AsyncStorage', timestamp: true });
    }
    catch (error) {
        rn_logging_1.Logger.error('Error occurred while saving data to AsyncStorage', error, { tag: 'AsyncStorage', timestamp: true });
    }
});
exports.writeToAsyncStorage = writeToAsyncStorage;
