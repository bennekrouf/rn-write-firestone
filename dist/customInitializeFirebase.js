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
const rn_logging_1 = require("rn-logging");
const customInitializeFirebase = (firebaseConfig) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.customInitializeFirebase = customInitializeFirebase;
