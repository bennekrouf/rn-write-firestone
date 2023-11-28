import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from 'mayo-logger'; 
import {customInitializeFirebase} from './customInitializeFirebase';
import {writeToFirebase} from './writeToFirebase';

export const signInFirebase = async (googleCredential:any, firebaseConfig = undefined) => {
  try {
    await customInitializeFirebase(firebaseConfig);
    Logger.info('Attempting Firebase signInWithCredential sign-in', { googleCredential }, { tag: 'mayo-firestore-write'});
    // Sign in to Firebase
    const firebaseUserCredential = await auth().signInWithCredential(googleCredential);

    // Save user to AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(firebaseUserCredential.user));
    Logger.info('Set last connection data in AsyncStorage', { user: firebaseUserCredential.user }, { tag: 'mayo-firestore-write'});

    const res = await writeToFirebase({
      lastConnectionDate: new Date(),
      email: firebaseUserCredential.user?.email
    
    }, true);
    Logger.info('Write to Firebase', { result: res }, { tag: 'mayo-firestore-write'});

    return firebaseUserCredential.user;
  } catch (error:any) {
    Logger.error('Error occurred during Firebase sign-in', error, { tag: 'mayo-firestore-write' });
    throw error;    
  }
}
