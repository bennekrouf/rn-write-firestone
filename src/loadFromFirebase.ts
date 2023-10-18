import firestore from '@react-native-firebase/firestore';
import { Logger } from 'rn-logging'; 
import { getStorageDetails } from './utils/getStorageDetails';

export const loadFromFirebase = async () => {
  const details = await getStorageDetails();
  Logger.info('Attempting to load document from Firestore with key', {key: details.firestoreKey}, { tag: 'rn-write-firestore'});

  try {
    // Validate if appCollection and key are defined and non-empty.
    if (!details.collection || !details.firestoreKey) {
      Logger.warn(`appCollection or key is undefined or empty.`);
      return undefined;
    }

    // Fetch document from Firestore
    const documentSnapshot = await firestore().collection(details.collection).doc(details.firestoreKey).get();

    // If the document exists, return its data. Else, return undefined or a default value.
    if (documentSnapshot.exists) {
      Logger.info('Document successfully retrieved from Firestore', documentSnapshot.data(), { tag: 'rn-write-firestore'});
      return documentSnapshot.data();
    } else {
      Logger.warn('No document found for the given key in the specified appCollection.', null, { tag: 'rn-write-firestore'});
      return undefined; // or any default value you'd like to return
    }
  } catch (error:any) {
    Logger.error('Failed to load document from Firestore', error, { tag: 'rn-write-firestore'});
    Logger.warn('Please ensure you have the appropriate Firestore rules set up and the document/key exists.', null, { tag: 'rn-write-firestore'});
  }
}
