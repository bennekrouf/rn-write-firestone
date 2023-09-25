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
const getKey_1 = require("./getKey");
const async_storage_1 = __importDefault(require("@react-native-community/async-storage"));
const getAppName_1 = require("./getAppName");
const writeToFirebase = (data, persistInAsyncStorage = true) => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, getAppName_1.getAppName)();
    const key = yield (0, getKey_1.getKey)();
    const appCollection = app === null || app === void 0 ? void 0 : app.toLocaleLowerCase();
    console.log(`Try to persist in : ${key}`);
    if (persistInAsyncStorage) {
        try {
            // Retrieve current data from firestore
            const documentSnapshot = yield (0, firestore_1.default)().collection(appCollection).doc(key).get();
            // Initial mergedData is the new data being provided
            let mergedData = data;
            if (documentSnapshot.exists) {
                const firestoreData = documentSnapshot.data();
                mergedData = Object.assign(Object.assign({}, firestoreData), data); // Merging firestore data with new data
            }
            // Retrieve current data from AsyncStorage
            const existingDataString = yield async_storage_1.default.getItem('user');
            const existingData = existingDataString ? JSON.parse(existingDataString) : {};
            // Merge existing AsyncStorage data with previously merged data
            mergedData = Object.assign(Object.assign({}, existingData), mergedData);
            // Saving merged data to AsyncStorage
            yield async_storage_1.default.setItem('user', JSON.stringify(mergedData));
        }
        catch (error) {
            console.error("RNNNN Error fetching or merging data writeToFirebase", error);
        }
    }
    try {
        yield (0, firestore_1.default)().collection(appCollection).doc(key).set(data, { merge: true });
        return true;
    }
    catch (error) {
        console.error("An error occurred:", error.message);
        console.log(`Please ensure you have the following Firestore rules set up:

      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {

          // Dynamic Rules for any appCollection
          match /{appCollection}/{id} {
            allow read, write: if request.auth != null && 
                              (request.auth.token.email == id || request.auth.token.uid == id);
          }
        }
      }
      `);
    }
});
exports.writeToFirebase = writeToFirebase;
