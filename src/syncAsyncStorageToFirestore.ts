import firestore from '@react-native-firebase/firestore';
import { Logger } from 'rn-logging'; 
import {getUser} from './getUser';
import { getAppName } from './utils/getAppName';
import { loadFromAsyncStorage } from './loadFromAsyncStorage';

export const syncAsyncStorageToFirestore = async () => {
  const app = getAppName();
  const user = await getUser();
  const id = user?.email || user?.uid;
  const appCollection = app?.toLocaleLowerCase();

  Logger.info('Starting sync of AsyncStorage data to Firestore', { app, userId: id }, { tag: 'Firestore', timestamp: true });

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

    Logger.info('Successfully synced AsyncStorage data to Firestore.', null, { tag: 'Firestore', timestamp: true });

  } catch (error:any) {
    Logger.error('Error occurred during sync of AsyncStorage to Firestore', error, { tag: 'Firestore', timestamp: true });
    Logger.warn(`Please ensure you have the correct Firestore rules set up.`, null, { tag: 'Firestore', timestamp: true });
  }
}
