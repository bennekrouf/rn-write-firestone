"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppName = void 0;
const app_1 = __importDefault(require("@react-native-firebase/app"));
const react_native_device_info_1 = __importDefault(require("react-native-device-info"));
const getAppName = () => {
    var _a;
    if (!((_a = app_1.default === null || app_1.default === void 0 ? void 0 : app_1.default.apps) === null || _a === void 0 ? void 0 : _a.length)) {
        // If no Firebase app is initialized, throw an error
        throw new Error("Firebase app is not initialized");
    }
    // Assuming a Firebase app is initialized, get the default app
    const defaultApp = app_1.default.app();
    // Return the name of the Firebase app if it's not '[DEFAULT]', otherwise return the bundle ID
    return defaultApp.name !== '[DEFAULT]' ? defaultApp.name : react_native_device_info_1.default.getBundleId();
};
exports.getAppName = getAppName;
