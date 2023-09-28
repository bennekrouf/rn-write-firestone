import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-community/async-storage';

import {getKey} from './getKey';
import { getAppName } from './getAppName';

export const writeToFirebase = async (data:any, persistInAsyncStorage: boolean = true) => {
  const app = getAppName();
  const key = await getKey();
  const appCollection = app?.toLocaleLowerCase();

  console.log(`Try to persist key : ${key} Value : ${JSON.stringify(data)}`);

  if (persistInAsyncStorage) {
    try {
      console.log(`Before n await firestore().collection`);

      // Retrieve current data from firestore
      const documentSnapshot = await firestore().collection(appCollection).doc(key).get();

      // Initial mergedData is the new data being provided
      let mergedData = data;

      console.log(`Before documentSnapshot.exists`);

      if (documentSnapshot.exists) {
        console.log(`Before documentSnapshot.data()`);
        const firestoreData = documentSnapshot.data();
        console.log(`Before mergedData = { ...firestoreData, ...data } ${JSON.stringify(firestoreData)}`);

        mergedData = { ...firestoreData, ...data }; // Merging firestore data with new data
      }

      // Retrieve current data from AsyncStorage
      // const existingDataString = await AsyncStorage.getItem('user');
      // const existingData = existingDataString ? JSON.parse(existingDataString) : {};

      // Merge existing AsyncStorage data with previously merged data
      // mergedData = { ...existingData, ...mergedData };

      // Saving merged data to AsyncStorage
      // await AsyncStorage.setItem('user', JSON.stringify(mergedData));      
    } catch (error) {
      console.error("RNNNN Error fetching or merging data writeToFirebase", error);
    }
  }

  try {
    await firestore().collection(appCollection).doc(key).set(data, { merge: true });
    return true;
  } catch (error:any) {
    console.error("An error occurred:", error.message);
    console.log(`Please ensure you have the following Firestore rules set up:

      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {

          // Dynamic Rules for any appCollection
          match /{appCollection}/{id} {
            allow read, write: if request.auth != null && 
                              (request.auth.token.email == id || request.auth.token.uid == id);
          }
        }
      }
      `);
  }
}