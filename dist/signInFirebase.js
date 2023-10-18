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
exports.signInFirebase = void 0;
const auth_1 = __importDefault(require("@react-native-firebase/auth"));
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const rn_logging_1 = require("rn-logging");
const customInitializeFirebase_1 = require("./customInitializeFirebase");
const writeToFirebase_1 = require("./writeToFirebase");
const signInFirebase = (firebaseConfig, googleCredential) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        rn_logging_1.Logger.info('Attempting Firebase sign-in', { firebaseConfig }, { tag: 'rn-write-firestore' });
        (0, customInitializeFirebase_1.customInitializeFirebase)(firebaseConfig);
        // Sign in to Firebase
        const firebaseUserCredential = yield (0, auth_1.default)().signInWithCredential(googleCredential);
        // Save user to AsyncStorage
        yield async_storage_1.default.setItem('user', JSON.stringify(firebaseUserCredential.user));
        rn_logging_1.Logger.info('Set last connection data in AsyncStorage', { user: firebaseUserCredential.user }, { tag: 'rn-write-firestore' });
        const res = yield (0, writeToFirebase_1.writeToFirebase)({
            lastConnectionDate: new Date(),
            email: (_a = firebaseUserCredential.user) === null || _a === void 0 ? void 0 : _a.email
        }, true);
        rn_logging_1.Logger.info('Write to Firebase', { result: res }, { tag: 'rn-write-firestore' });
        return firebaseUserCredential.user;
    }
    catch (error) {
        rn_logging_1.Logger.error('Error occurred during Firebase sign-in', error, { tag: 'rn-write-firestore' });
        throw error;
    }
});
exports.signInFirebase = signInFirebase;
