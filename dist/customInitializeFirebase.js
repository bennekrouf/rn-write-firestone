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
exports.customInitializeFirebase = void 0;
const app_1 = __importDefault(require("@react-native-firebase/app"));
const mayo_logger_1 = require("mayo-logger");
const customInitializeFirebase = (providedConfiguration = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    mayo_logger_1.Logger.info('Starting Firebase custom initialization...', null, { tag: 'mayo-firebase-write' });
    try {
        const firebaseConfig = providedConfiguration;
        if (firebaseConfig) {
            mayo_logger_1.Logger.info('Successfully extracted Firebase config', null, { tag: 'mayo-firebase-write' });
        }
        else {
            mayo_logger_1.Logger.error('Extracted Firebase config is empty or invalid', null, { tag: 'mayo-firebase-write' });
        }
        if (typeof firebaseConfig !== 'object' || Object.keys(firebaseConfig).length === 0) {
            const errorMsg = 'Invalid or missing firebaseConfig provided.';
            mayo_logger_1.Logger.error(errorMsg, null, { tag: 'mayo-firebase-write' });
            throw new Error(errorMsg);
        }
        mayo_logger_1.Logger.info('Firebase config:', { firebaseConfig }, { tag: 'mayo-firebase-write' });
        if (!app_1.default.apps.length) {
            mayo_logger_1.Logger.info('Initializing firebase app', null, { tag: 'mayo-firebase-write' });
            return app_1.default.initializeApp(firebaseConfig);
        }
        else {
            mayo_logger_1.Logger.info('Firebase app already initialized', null, { tag: 'mayo-firebase-write' });
            return app_1.default.app();
        }
    }
    catch (error) {
        mayo_logger_1.Logger.error('Error initializing firebase app', error, { tag: 'mayo-firebase-write' });
        throw error;
    }
});
exports.customInitializeFirebase = customInitializeFirebase;
