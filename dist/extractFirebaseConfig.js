"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFirebaseConfig = void 0;
const react_native_1 = require("react-native");
const rn_logging_1 = require("rn-logging");
const { FirebaseConfigExtractor } = react_native_1.NativeModules;
const extractFirebaseConfig = () => {
    rn_logging_1.Logger.info('Starting Firebase config extraction...', null, { tag: 'rn-firebase-config-extractor' });
    const config = FirebaseConfigExtractor.extractConfig();
    if (config && typeof config === 'object' && Object.keys(config).length > 0) {
        rn_logging_1.Logger.info('Successfully extracted Firebase config', null, { tag: 'rn-firebase-config-extractor' });
    }
    else {
        rn_logging_1.Logger.warn('Failed to extract valid Firebase config or the config is empty', null, { tag: 'rn-firebase-config-extractor' });
    }
    // This log may expose sensitive information, so be cautious about using it in a production environment
    rn_logging_1.Logger.info('Extracted Firebase config:', { config }, { tag: 'rn-firebase-config-extractor' });
    return config;
};
exports.extractFirebaseConfig = extractFirebaseConfig;
