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
exports.loadFromFirestore = void 0;
const firestore_1 = __importDefault(require("@react-native-firebase/firestore"));
const mayo_logger_1 = require("mayo-logger");
const getStorageDetails_1 = require("./utils/getStorageDetails");
const loadFromFirestore = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const details = yield (0, getStorageDetails_1.getStorageDetails)();
    mayo_logger_1.Logger.info('Attempting to load document from Firestore with key', { key: details.firestoreKey }, { tag: 'mayo-firestore-write' });
    try {
        // Validate if appCollection and key are defined and non-empty.
        if (!details.collection || !details.firestoreKey) {
            mayo_logger_1.Logger.warn(`appCollection or key is undefined or empty.`);
            return undefined;
        }
        // Fetch document from Firestore
        const documentSnapshot = yield (0, firestore_1.default)().collection(details.collection).doc(details.firestoreKey).get();
        // If the document exists, return its data. Else, return undefined or a default value.
        if (documentSnapshot.exists) {
            mayo_logger_1.Logger.info('Document successfully retrieved from Firestore', (_a = documentSnapshot.data()) === null || _a === void 0 ? void 0 : _a.data, { tag: 'mayo-firestore-write' });
            return (_b = documentSnapshot.data()) === null || _b === void 0 ? void 0 : _b.data;
        }
        else {
            mayo_logger_1.Logger.warn('No document found for the given key in the specified appCollection.', null, { tag: 'mayo-firestore-write' });
            return undefined; // or any default value you'd like to return
        }
    }
    catch (error) {
        mayo_logger_1.Logger.error('Failed to load document from Firestore', error, { tag: 'mayo-firestore-write' });
        mayo_logger_1.Logger.warn('Please ensure you have the appropriate Firestore rules set up and the document/key exists.', null, { tag: 'mayo-firestore-write' });
    }
});
exports.loadFromFirestore = loadFromFirestore;
