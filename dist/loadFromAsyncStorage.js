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
const rn_logging_1 = require("rn-logging");
const getStorageKey_1 = require("./utils/getStorageKey");
const loadFromAsyncStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storageKey = yield (0, getStorageKey_1.getStorageKey)();
        rn_logging_1.Logger.info('Attempting to load data from AsyncStorage : ', storageKey, { tag: 'Storage', timestamp: true });
        const dataString = yield async_storage_1.default.getItem(storageKey);
        if (dataString) {
            rn_logging_1.Logger.info('Data successfully retrieved from AsyncStorage', JSON.parse(dataString), { tag: 'Storage', timestamp: true });
            return JSON.parse(dataString); // Convert string back to object
        }
        else {
            rn_logging_1.Logger.warn('No data found for the given storageKey in AsyncStorage.', storageKey, { tag: 'Storage', timestamp: true });
            return undefined; // or any default value you'd like to return
        }
    }
    catch (error) {
        rn_logging_1.Logger.error('Failed to load data from AsyncStorage', error, { tag: 'Storage', timestamp: true });
        rn_logging_1.Logger.warn('Please ensure you have read/write permissions for AsyncStorage and the key exists.', null, { tag: 'Storage', timestamp: true });
    }
});
exports.loadFromAsyncStorage = loadFromAsyncStorage;
