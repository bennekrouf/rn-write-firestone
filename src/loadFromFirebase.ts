import firestore from '@react-native-firebase/firestore';

import {getKey} from './getKey';
import {getAppName} from './getAppName';

export const loadFromFirebase = async () => {
  try {
    const app = getAppName();
    const key = await getKey();
    const appCollection = app?.toLocaleLowerCase();

    // Validate if appCollection and key are defined and non-empty.
    if (!appCollection || !key) {
      console.warn('[WARNING] ' + new Date().toISOString() + ' - loadFromFirebase: appCollection or key is undefined or empty.');
      return undefined;
    }

    // Fetch document from Firestore
    const documentSnapshot = await firestore().collection(appCollection).doc(key).get();

    // If the document exists, return its data. Else, log and return undefined.
    if (documentSnapshot.exists) {
      return documentSnapshot.data();
    } else {
      console.log('[INFO] ' + new Date().toISOString() + ' - loadFromFirebase: No document found for key [' + key + '] in collection [' + appCollection + '].');
      return undefined;
    }
  } catch (error:any) {
    console.error('[ERROR] ' + new Date().toISOString() + ' - loadFromFirebase Error:', error.message);
    console.info('[INFO] ' + new Date().toISOString() + ' - Please ensure you have the appropriate Firestore rules set up and the document/key exists.');
    throw error; // Propagate the error further for potentially being caught by an error boundary or calling function.
  }
}
