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
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const mayo_logger_1 = require("mayo-logger");
const getStorageDetails_1 = require("./utils/getStorageDetails");
const loadFromAsyncStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const details = yield (0, getStorageDetails_1.getStorageDetails)();
        mayo_logger_1.Logger.info('Attempting to load data from AsyncStorage : ', details.asyncStorageKey, { tag: 'mayo-firestore-write' });
        const dataString = yield async_storage_1.default.getItem(details.asyncStorageKey);
        if (dataString) {
            mayo_logger_1.Logger.info('Data successfully retrieved from AsyncStorage', JSON.parse(dataString), { tag: 'mayo-firestore-write' });
            return (_a = JSON.parse(dataString)) === null || _a === void 0 ? void 0 : _a.data; // Convert string back to object
        }
        else {
            mayo_logger_1.Logger.warn('No data found for the given storageKey in AsyncStorage.', details.asyncStorageKey, { tag: 'mayo-firestore-write' });
            return undefined; // or any default value you'd like to return
        }
    }
    catch (error) {
        mayo_logger_1.Logger.error('Failed to load data from AsyncStorage', error, { tag: 'mayo-firestore-write' });
        mayo_logger_1.Logger.warn('Please ensure you have read/write permissions for AsyncStorage and the key exists.', null, { tag: 'mayo-firestore-write' });
    }
});
exports.loadFromAsyncStorage = loadFromAsyncStorage;
