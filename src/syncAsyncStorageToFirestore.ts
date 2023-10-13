import firestore from '@react-native-firebase/firestore';
import {getUser} from './getUser';
import { getAppName } from './utils/getAppName';
import { loadFromAsyncStorage } from './loadFromAsyncStorage';

export const syncAsyncStorageToFirestore = async () => {
  const app = getAppName();
  const user = await getUser();
  const id = user?.email || user?.uid;
  const appCollection = app?.toLocaleLowerCase();

  try {
    // Retrieve current data from AsyncStorage
    const existingDataString = await loadFromAsyncStorage();
    const asyncStorageData = existingDataString ? JSON.stringify(existingDataString) : {};

    // Retrieve current data from firestore
    const documentSnapshot = await firestore().collection(appCollection).doc(id).get();
    const firestoreData = documentSnapshot.exists ? documentSnapshot.data() : {};

    // Merge firestore data with AsyncStorage data (with AsyncStorage data taking precedence)
    const mergedData = { ...firestoreData, ...asyncStorageData, updatedAt: new Date() };

    // Write the merged data back to firestore
    await firestore()
      .collection(appCollection)
      .doc(id)
      .set(mergedData, { merge: true });

    console.log('Synced AsyncStorage data to Firestore.');

  } catch (error) {
    console.error("RNNN Error synchronizing data", error);
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
