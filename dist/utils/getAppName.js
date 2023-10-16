"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppName = void 0;
const app_1 = __importDefault(require("@react-native-firebase/app"));
const react_native_device_info_1 = __importDefault(require("react-native-device-info"));
const getAppName = () => {
    const bundleID = react_native_device_info_1.default.getBundleId();
    if (!app_1.default.apps.length) {
        console.log(`RN Init firebase app`);
        return 'NO_APP_NAME';
    }
    else {
        const defaultApp = app_1.default.app();
        return defaultApp.name !== '[DEFAULT]' ? defaultApp.name : bundleID;
    }
};
exports.getAppName = getAppName;
