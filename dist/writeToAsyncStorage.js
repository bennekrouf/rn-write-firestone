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
const getStorageDetails_1 = require("./utils/getStorageDetails");
const writeToAsyncStorage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const details = yield (0, getStorageDetails_1.getStorageDetails)();
    rn_logging_1.Logger.info('Attempting to persist data to AsyncStorage', { key: details.asyncStorageKey, data }, { tag: 'rn-write-firestore' });
    try {
        yield async_storage_1.default.setItem(details.asyncStorageKey, JSON.stringify({ data: data }));
        rn_logging_1.Logger.info('Data successfully saved to AsyncStorage', null, { tag: 'rn-write-firestore' });
    }
    catch (error) {
        rn_logging_1.Logger.error('Error occurred while saving data to AsyncStorage', error, { tag: 'rn-write-firestore' });
    }
});
exports.writeToAsyncStorage = writeToAsyncStorage;
