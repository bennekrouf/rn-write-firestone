import firebase from '@react-native-firebase/app';
import { Logger } from 'rn-logging';

export const customInitializeFirebase = (firebaseConfig:any) => {
  try {
    if (!firebase.apps.length) {
      Logger.info('Initializing firebase app', firebaseConfig, { tag: 'RN' });
      return firebase.initializeApp(firebaseConfig);
    } else {
      Logger.info('Firebase app already initialized', { existingApps: firebase.apps }, { tag: 'RN' });
      return firebase.app();
    }
  } catch (error) {
    Logger.error('Error initializing firebase app', error, { tag: 'RN' });
    return error; 
  }
};
