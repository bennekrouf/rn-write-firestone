// Assuming both functions are in the same directory for simplicity
import { extractFirebaseConfig } from './extractFirebaseConfig'; 

import firebase from '@react-native-firebase/app';
import { Logger } from 'rn-logging';

export const customInitializeFirebase = () => {
    Logger.info('Starting Firebase custom initialization...', null, { tag: 'rn-write-firebase' });

    try {
        const firebaseConfig = extractFirebaseConfig();

        // Logging the extraction process
        if (firebaseConfig) {
            Logger.info('Successfully extracted Firebase config', null, { tag: 'rn-write-firebase' });
        } else {
            Logger.warn('Extracted Firebase config is empty or invalid', null, { tag: 'rn-write-firebase' });
        }

        if (!firebaseConfig || typeof firebaseConfig !== 'object' || Object.keys(firebaseConfig).length === 0) {
            const errorMsg = 'Invalid or missing firebaseConfig provided.';
            Logger.error(errorMsg, null, { tag: 'rn-write-firebase' });
            throw new Error(errorMsg);
        }

        // Logging the actual Firebase config; be cautious about this in a production environment
        Logger.info('Firebase config:', { firebaseConfig }, { tag: 'rn-write-firebase' });

        if (!firebase.apps.length) {
            Logger.info('Initializing firebase app', null, { tag: 'rn-write-firebase' });
            return firebase.initializeApp(firebaseConfig);
        } else {
            Logger.info('Firebase app already initialized', null, { tag: 'rn-write-firebase' });
            return firebase.app();
        }
    } catch (error) {
        Logger.error('Error initializing firebase app', error, { tag: 'rn-write-firebase' });
        throw error; 
    }
};
