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
const getStorageDetails_1 = require("./utils/getStorageDetails");
const loadFromAsyncStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const details = yield (0, getStorageDetails_1.getStorageDetails)();
        rn_logging_1.Logger.info('Attempting to load data from AsyncStorage : ', details.asyncStorageKey, { tag: 'rn-write-firestore' });
        const dataString = yield async_storage_1.default.getItem(details.asyncStorageKey);
        if (dataString) {
            rn_logging_1.Logger.info('Data successfully retrieved from AsyncStorage', JSON.parse(dataString), { tag: 'rn-write-firestore' });
            return (_a = JSON.parse(dataString)) === null || _a === void 0 ? void 0 : _a.data; // Convert string back to object
        }
        else {
            rn_logging_1.Logger.warn('No data found for the given storageKey in AsyncStorage.', details.asyncStorageKey, { tag: 'rn-write-firestore' });
            return undefined; // or any default value you'd like to return
        }
    }
    catch (error) {
        rn_logging_1.Logger.error('Failed to load data from AsyncStorage', error, { tag: 'rn-write-firestore' });
        rn_logging_1.Logger.warn('Please ensure you have read/write permissions for AsyncStorage and the key exists.', null, { tag: 'rn-write-firestore' });
    }
});
exports.loadFromAsyncStorage = loadFromAsyncStorage;
