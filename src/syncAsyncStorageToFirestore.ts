import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import {getUser} from './getUser';
import { getAppName } from './getAppName';

export const syncAsyncStorageToFirestore = async () => {
  const app = getAppName();
  const user = await getUser();
  const id = user?.email || user?.uid;
  const appCollection = app?.toLocaleLowerCase();

  try {
    // Retrieve current data from AsyncStorage
    const existingDataString = await AsyncStorage.getItem('user');
    const asyncStorageData = existingDataString ? JSON.parse(existingDataString) : {};

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
  }
}
