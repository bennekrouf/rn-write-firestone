"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customInitializeFirebase = void 0;
const app_1 = __importDefault(require("@react-native-firebase/app"));
const rn_logging_1 = require("rn-logging");
const customInitializeFirebase = (firebaseConfig) => {
    try {
        if (!app_1.default.apps.length) {
            rn_logging_1.Logger.info('Initializing firebase app', firebaseConfig, { tag: 'RN' });
            return app_1.default.initializeApp(firebaseConfig);
        }
        else {
            rn_logging_1.Logger.info('Firebase app already initialized', { existingApps: app_1.default.apps }, { tag: 'RN' });
            return app_1.default.app();
        }
    }
    catch (error) {
        rn_logging_1.Logger.error('Error initializing firebase app', error, { tag: 'RN' });
        return error;
    }
};
exports.customInitializeFirebase = customInitializeFirebase;
