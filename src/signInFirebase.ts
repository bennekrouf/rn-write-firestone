import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from 'rn-logging'; 
import {customInitializeFirebase} from './customInitializeFirebase';
import {writeToFirebase} from './writeToFirebase';

export const signInFirebase = async (firebaseConfig:any, googleCredential:any) => {
  try {
    Logger.info('Attempting Firebase sign-in', { firebaseConfig }, { tag: 'Firebase', timestamp: true });

    customInitializeFirebase(firebaseConfig);

    // Sign in to Firebase
    const firebaseUserCredential = await auth().signInWithCredential(googleCredential);

    // Save user to AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(firebaseUserCredential.user));
    Logger.info('Set last connection data in AsyncStorage', { user: firebaseUserCredential.user }, { tag: 'Firebase', timestamp: true });

    const res = writeToFirebase({lastConnectionDate: new Date()}, true);
    Logger.info('Write to Firebase', { result: res }, { tag: 'Firebase', timestamp: true });

    return firebaseUserCredential.user;
  } catch (error:any) {
    Logger.error('Error occurred during Firebase sign-in', error, { tag: 'Firebase', timestamp: true });
    throw error;    
  }
}
