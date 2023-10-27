import firestore from '@react-native-firebase/firestore';
import { Logger } from 'mayo-logger'; 
import { loadFromAsyncStorage } from './loadFromAsyncStorage';
import { getStorageDetails } from './utils/getStorageDetails';

export const syncAsyncStorageToFirestore = async () => {
  const details = await getStorageDetails();
  Logger.info('Starting sync of AsyncStorage data to Firestore', { key: details.asyncStorageKey }, { tag: 'mayo-firestore-write'});

  try {
    // Retrieve current data from AsyncStorage
    let existingDataString = await loadFromAsyncStorage();
    const asyncStorageData = existingDataString || {};

    // Retrieve current data from firestore
    const documentSnapshot = await firestore().collection(details.collection).doc(details.firestoreKey).get();
    const firestoreData = documentSnapshot.exists ? documentSnapshot.data()?.data : {};

    // Merge firestore data with AsyncStorage data (with AsyncStorage data taking precedence)
    const mergedData = { ...firestoreData, ...asyncStorageData, updatedAt: new Date() };

    Logger.info('Attempting to write merged data to Firestore...', { mergedData }, { tag: 'mayo-firestore-write'});

    // Write the merged data back to firestore
    await firestore()
      .collection(details.collection)
      .doc(details.firestoreKey)
      .set({data: mergedData}, { merge: true });

    Logger.info('Successfully synced AsyncStorage data to Firestore.', null, { tag: 'mayo-firestore-write'});

  } catch (error:any) {
    Logger.error('Error occurred during sync of AsyncStorage to Firestore', error, { tag: 'mayo-firestore-write'});
    Logger.warn(`Please ensure you have the correct Firestore rules set up.`, null, { tag: 'mayo-firestore-write'});
  }
}
