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
exports.flushFromAsyncStorage = void 0;
const async_storage_1 = __importDefault(require("@react-native-community/async-storage"));
const getStorageDetails_1 = require("./utils/getStorageDetails");
const mayo_logger_1 = require("mayo-logger");
const flushFromAsyncStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const details = yield (0, getStorageDetails_1.getStorageDetails)();
        mayo_logger_1.Logger.info('Attempting to remove storageKey from AsyncStorage', { key: details.asyncStorageKey }, { tag: 'mayo-firestore-write' });
        yield async_storage_1.default.removeItem(details.asyncStorageKey);
        mayo_logger_1.Logger.info('Data successfully removed from AsyncStorage', { key: details.asyncStorageKey }, { tag: 'mayo-firestore-write' });
    }
    catch (error) {
        mayo_logger_1.Logger.error('Error occurred while removing data from AsyncStorage', error, { tag: 'mayo-firestore-write' });
    }
});
exports.flushFromAsyncStorage = flushFromAsyncStorage;
