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
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userString = yield async_storage_1.default.getItem('user');
            if (userString !== null) {
                return JSON.parse(userString);
            }
            else {
                console.log("No user data found.");
                return null;
            }
        }
        catch (e) {
            console.error("RNN Failed to get user from storage:", e);
            return null;
        }
    });
}
exports.getUser = getUser;
