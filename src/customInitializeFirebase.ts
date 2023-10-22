import firebase from '@react-native-firebase/app';

import { Logger } from 'rn-logging';

export const customInitializeFirebase = (firebaseConfig:any) => {
  try {
    if (!firebaseConfig || typeof firebaseConfig !== 'object' || Object.keys(firebaseConfig).length === 0) {
      const errorMsg = 'Invalid or missing firebaseConfig provided.';
      Logger.error(errorMsg, null, { tag: 'rn-write-firebase' });
      throw new Error(errorMsg);
    }
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
