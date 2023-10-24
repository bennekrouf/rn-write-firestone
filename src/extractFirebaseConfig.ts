import { NativeModules } from 'react-native';
import { Logger } from 'rn-logging';

const { FirebaseConfigExtractor } = NativeModules;

export const extractFirebaseConfig = () => {
    Logger.info('Starting Firebase config extraction...', null, { tag: 'rn-firebase-config-extractor' });
  
    const config = FirebaseConfigExtractor.extractConfig();
    
    if (config && typeof config === 'object' && Object.keys(config).length > 0) {
        Logger.info('Successfully extracted Firebase config', null, { tag: 'rn-firebase-config-extractor' });
    } else {
        Logger.warn('Failed to extract valid Firebase config or the config is empty', null, { tag: 'rn-firebase-config-extractor' });
    }

    // This log may expose sensitive information, so be cautious about using it in a production environment
    Logger.info('Extracted Firebase config:', { config }, { tag: 'rn-firebase-config-extractor' });

    return config;
};
