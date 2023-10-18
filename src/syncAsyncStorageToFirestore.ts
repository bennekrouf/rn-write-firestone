import firestore from '@react-native-firebase/firestore';
import { Logger } from 'rn-logging'; 
import {getUser} from './getUser';
import { getAppName } from './utils/getAppName';
import { loadFromAsyncStorage } from './loadFromAsyncStorage';
import { getStorageKey } from './utils/getStorageKey';

export const syncAsyncStorageToFirestore = async () => {
  const storageKey = await getStorageKey();
  Logger.info('Storage key value', { storageKey }, { tag: 'rn-write-firestore'});
 
  const app = getAppName();
  const user = await getUser();
  const id = user?.uid;
  const appCollection = app?.toLocaleLowerCase();

  Logger.info('Starting sync of AsyncStorage data to Firestore', { app, userId: id }, { tag: 'rn-write-firestore'});

  try {
    // Retrieve current data from AsyncStorage
    let existingDataString = await loadFromAsyncStorage();
    const asyncStorageData = existingDataString || {};

    // Retrieve current data from firestore
    const documentSnapshot = await firestore().collection(appCollection).doc(id).get();
    const firestoreData = documentSnapshot.exists ? documentSnapshot.data() : {};

    // Merge firestore data with AsyncStorage data (with AsyncStorage data taking precedence)
    const mergedData = { ...firestoreData, ...asyncStorageData, updatedAt: new Date() };

    Logger.info('Attempting to write merged data to Firestore...', { mergedData }, { tag: 'rn-write-firestore'});

    // Write the merged data back to firestore
    await firestore()
      .collection(appCollection)
      .doc(id)
      .set({data: mergedData}, { merge: true });

    Logger.info('Successfully synced AsyncStorage data to Firestore.', null, { tag: 'rn-write-firestore'});

  } catch (error:any) {
    Logger.error('Error occurred during sync of AsyncStorage to Firestore', error, { tag: 'rn-write-firestore'});
    Logger.warn(`Please ensure you have the correct Firestore rules set up.`, null, { tag: 'rn-write-firestore'});
  }
}
