"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customInitializeFirebase = void 0;
// Assuming both functions are in the same directory for simplicity
const extractFirebaseConfig_1 = require("./extractFirebaseConfig");
const app_1 = __importDefault(require("@react-native-firebase/app"));
const rn_logging_1 = require("rn-logging");
const customInitializeFirebase = () => {
    rn_logging_1.Logger.info('Starting Firebase custom initialization...', null, { tag: 'rn-write-firebase' });
    try {
        const firebaseConfig = (0, extractFirebaseConfig_1.extractFirebaseConfig)();
        // Logging the extraction process
        if (firebaseConfig) {
            rn_logging_1.Logger.info('Successfully extracted Firebase config', null, { tag: 'rn-write-firebase' });
        }
        else {
            rn_logging_1.Logger.warn('Extracted Firebase config is empty or invalid', null, { tag: 'rn-write-firebase' });
        }
        if (!firebaseConfig || typeof firebaseConfig !== 'object' || Object.keys(firebaseConfig).length === 0) {
            const errorMsg = 'Invalid or missing firebaseConfig provided.';
            rn_logging_1.Logger.error(errorMsg, null, { tag: 'rn-write-firebase' });
            throw new Error(errorMsg);
        }
        // Logging the actual Firebase config; be cautious about this in a production environment
        rn_logging_1.Logger.info('Firebase config:', { firebaseConfig }, { tag: 'rn-write-firebase' });
        if (!app_1.default.apps.length) {
            rn_logging_1.Logger.info('Initializing firebase app', null, { tag: 'rn-write-firebase' });
            return app_1.default.initializeApp(firebaseConfig);
        }
        else {
            rn_logging_1.Logger.info('Firebase app already initialized', null, { tag: 'rn-write-firebase' });
            return app_1.default.app();
        }
    }
    catch (error) {
        rn_logging_1.Logger.error('Error initializing firebase app', error, { tag: 'rn-write-firebase' });
        throw error;
    }
};
exports.customInitializeFirebase = customInitializeFirebase;
