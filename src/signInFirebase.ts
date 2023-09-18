import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {customInitializeFirebase} from './customInitializeFirebase';
import {writeInFirebase} from './writeInFirebase';

export const signInFirebase = async (app:string, firebaseConfig:any, googleCredential:any) => {
  console.log(`RN firebaseConfig : ${JSON.stringify(firebaseConfig)} app : ${JSON.stringify(app)}`);
  customInitializeFirebase(firebaseConfig);

  // Sign in to Firebase
  const firebaseUserCredential = await auth().signInWithCredential(googleCredential);
  // Save user to AsyncStorage
  await AsyncStorage.setItem('user', JSON.stringify(firebaseUserCredential.user));
  writeInFirebase(app, {lastConnectionDate: new Date()});
  return firebaseUserCredential.user;
}