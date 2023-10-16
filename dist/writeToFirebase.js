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
exports.writeToFirebase = void 0;
const firestore_1 = __importDefault(require("@react-native-firebase/firestore"));
const rn_logging_1 = require("rn-logging");
const getKey_1 = require("./utils/getKey");
const getAppName_1 = require("./utils/getAppName");
const writeToFirebase = (data, merge = true) => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, getAppName_1.getAppName)();
    const key = yield (0, getKey_1.getKey)();
    const appCollection = app === null || app === void 0 ? void 0 : app.toLocaleLowerCase();
    rn_logging_1.Logger.info('Attempting to persist data to Firestore', { appCollection, key, data, mergeOption: merge }, { tag: 'Firestore', timestamp: true });
    try {
        return (0, firestore_1.default)().collection(appCollection).doc(key).set(data, { merge });
    }
    catch (error) {
        rn_logging_1.Logger.error('Error occurred while saving data to Firestore', error, { tag: 'Firestore', timestamp: true });
        rn_logging_1.Logger.warn(`Please ensure you have the following Firestore rules set up:
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            // Dynamic Rules for any appCollection
            match /{appCollection}/{id} {
              allow read, write: if request.auth != null && 
                                (request.auth.token.email == id || request.auth.token.uid == id);
            }
          }
        }`, null, { tag: 'Firestore', timestamp: true });
    }
});
exports.writeToFirebase = writeToFirebase;
