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
exports.loadFromFirebase = void 0;
const firestore_1 = __importDefault(require("@react-native-firebase/firestore"));
const rn_logging_1 = require("rn-logging");
const getStorageKey_1 = require("./utils/getStorageKey");
const getAppName_1 = require("./utils/getAppName");
const loadFromFirebase = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const key = yield (0, getStorageKey_1.getStorageKey)();
    const appCollection = (_a = (0, getAppName_1.getAppName)()) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
    rn_logging_1.Logger.info('Attempting to load document from Firestore', null, { tag: 'Firestore', timestamp: true });
    try {
        // Fetch document from Firestore
        const documentSnapshot = yield (0, firestore_1.default)().collection(appCollection).doc(key).get();
        // If the document exists, return its data. Else, return undefined or a default value.
        if (documentSnapshot.exists) {
            rn_logging_1.Logger.info('Document successfully retrieved from Firestore', documentSnapshot.data(), { tag: 'Firestore', timestamp: true });
            return documentSnapshot.data();
        }
        else {
            rn_logging_1.Logger.warn('No document found for the given key in the specified appCollection.', null, { tag: 'Firestore', timestamp: true });
            return undefined; // or any default value you'd like to return
        }
    }
    catch (error) {
        rn_logging_1.Logger.error('Failed to load document from Firestore', error, { tag: 'Firestore', timestamp: true });
        rn_logging_1.Logger.warn('Please ensure you have the appropriate Firestore rules set up and the document/key exists.', null, { tag: 'Firestore', timestamp: true });
    }
});
exports.loadFromFirebase = loadFromFirebase;
