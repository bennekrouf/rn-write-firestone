// Assuming both functions are in the same directory for simplicity
import { extractFirebaseConfig } from 'mayo-firebase-config'; 

import firebase from '@react-native-firebase/app';
import { Logger } from 'mayo-logger';

export const customInitializeFirebase = async () => {
    Logger.info('Starting Firebase custom initialization...', null, { tag: 'mayo-firebase-write' });

    try {
        const firebaseConfig = await extractFirebaseConfig();

        // Logging the extraction process
        if (firebaseConfig) {
            Logger.info('Successfully extracted Firebase config', null, { tag: 'mayo-firebase-write' });
        } else {
            Logger.error('Extracted Firebase config is empty or invalid', null, { tag: 'mayo-firebase-write' });
        }

        if (typeof firebaseConfig !== 'object' || Object.keys(firebaseConfig).length === 0) {
            const errorMsg = 'Invalid or missing firebaseConfig provided.';
            Logger.error(errorMsg, null, { tag: 'mayo-firebase-write' });
            throw new Error(errorMsg);
        }

        // Logging the actual Firebase config; be cautious about this in a production environment
        Logger.info('Firebase config:', { firebaseConfig }, { tag: 'mayo-firebase-write' });

        if (!firebase.apps.length) {
            Logger.info('Initializing firebase app', null, { tag: 'mayo-firebase-write' });
            return firebase.initializeApp(firebaseConfig);
        } else {
            Logger.info('Firebase app already initialized', null, { tag: 'mayo-firebase-write' });
            return firebase.app();
        }
    } catch (error) {
        Logger.error('Error initializing firebase app', error, { tag: 'mayo-firebase-write' });
        throw error; 
    }
};
