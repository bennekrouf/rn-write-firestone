import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {customInitializeFirebase} from './customInitializeFirebase';
import {writeToFirebase} from './writeToFirebase';

export const signInFirebase = async (firebaseConfig:any, googleCredential:any) => {
  try {
    console.log(`RN firebaseConfig : ${JSON.stringify(firebaseConfig)}`);
    customInitializeFirebase(firebaseConfig);

    // Sign in to Firebase
    const firebaseUserCredential = await auth().signInWithCredential(googleCredential);
    // Save user to AsyncStorage
    console.log(`Set ${JSON.stringify(firebaseUserCredential.user)}`);
    await AsyncStorage.setItem('user', JSON.stringify(firebaseUserCredential.user));
    writeToFirebase({lastConnectionDate: new Date()}, true);
    return firebaseUserCredential.user;
  } catch (error) {
    console.log('RNNNN ERROR HE HO :', error);
    throw error;    
  }
}