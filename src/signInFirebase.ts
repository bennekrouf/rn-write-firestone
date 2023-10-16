import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {customInitializeFirebase} from './customInitializeFirebase';
import {writeToFirebase} from './writeToFirebase';

export const signInFirebase = async (firebaseConfig:any, googleCredential:any) => {
  try {
    console.log(`RN 1 - firebaseConfig : ${JSON.stringify(firebaseConfig)}`);
    customInitializeFirebase(firebaseConfig);

    // Sign in to Firebase
    const firebaseUserCredential = await auth().signInWithCredential(googleCredential);
    // Save user to AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(firebaseUserCredential.user));
    console.log(`RN 2 - Set last connection data in AsyncStorage ${JSON.stringify(firebaseUserCredential.user)}`);
    // const res = writeToFirebase({lastConnectionDate: new Date()}, true);
    // console.log(`RN 3 - Write seems ok ${res}`);
    return firebaseUserCredential.user;
  } catch (error) {
    console.log('RN X - ERROR HE HO :', error);
    throw error;    
  }
}