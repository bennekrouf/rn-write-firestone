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
exports.getUser = void 0;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const rn_logging_1 = require("rn-logging");
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const storageKey = 'user';
        try {
            const userString = yield async_storage_1.default.getItem(storageKey);
            if (userString !== null) {
                rn_logging_1.Logger.info('Successfully retrieved user from storage', JSON.parse(userString), { tag: 'User' });
                return JSON.parse(userString);
            }
            else {
                rn_logging_1.Logger.info('No user data found in storage.', null, { tag: 'User' });
                return null;
            }
        }
        catch (e) {
            rn_logging_1.Logger.error('Failed to get user from storage', e, { tag: 'User' });
            return null;
        }
    });
}
exports.getUser = getUser;
