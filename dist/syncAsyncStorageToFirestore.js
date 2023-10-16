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
exports.syncAsyncStorageToFirestore = void 0;
const firestore_1 = __importDefault(require("@react-native-firebase/firestore"));
const rn_logging_1 = require("rn-logging");
const getUser_1 = require("./getUser");
const getAppName_1 = require("./utils/getAppName");
const loadFromAsyncStorage_1 = require("./loadFromAsyncStorage");
const getStorageKey_1 = require("./utils/getStorageKey");
const syncAsyncStorageToFirestore = () => __awaiter(void 0, void 0, void 0, function* () {
    const storageKey = yield (0, getStorageKey_1.getStorageKey)();
    const app = (0, getAppName_1.getAppName)();
    const user = yield (0, getUser_1.getUser)();
    const id = user === null || user === void 0 ? void 0 : user.uid;
    const appCollection = app === null || app === void 0 ? void 0 : app.toLocaleLowerCase();
    rn_logging_1.Logger.info('Starting sync of AsyncStorage data to Firestore', { app, userId: id }, { tag: 'Firestore', timestamp: true });
    try {
        // Retrieve current data from AsyncStorage
        const existingDataString = yield (0, loadFromAsyncStorage_1.loadFromAsyncStorage)();
        const asyncStorageData = existingDataString ? JSON.stringify(existingDataString) : {};
        // Retrieve current data from firestore
        const documentSnapshot = yield (0, firestore_1.default)().collection(appCollection).doc(id).get();
        const firestoreData = documentSnapshot.exists ? documentSnapshot.data() : {};
        // Merge firestore data with AsyncStorage data (with AsyncStorage data taking precedence)
        const mergedData = Object.assign(Object.assign(Object.assign({}, firestoreData), asyncStorageData), { updatedAt: new Date() });
        // Write the merged data back to firestore
        yield (0, firestore_1.default)()
            .collection(appCollection)
            .doc(id)
            .set(mergedData, { merge: true });
        rn_logging_1.Logger.info('Successfully synced AsyncStorage data to Firestore.', null, { tag: 'Firestore', timestamp: true });
    }
    catch (error) {
        rn_logging_1.Logger.error('Error occurred during sync of AsyncStorage to Firestore', error, { tag: 'Firestore', timestamp: true });
        rn_logging_1.Logger.warn(`Please ensure you have the correct Firestore rules set up.`, null, { tag: 'Firestore', timestamp: true });
    }
});
exports.syncAsyncStorageToFirestore = syncAsyncStorageToFirestore;
