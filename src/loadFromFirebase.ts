import firestore from '@react-native-firebase/firestore';

import {getKey} from './getKey';
import {getAppName} from './getAppName';

export const loadFromFirebase = async () => {
  const app = getAppName();
  const key = await getKey();
  const appCollection = app?.toLocaleLowerCase();

  try {
    // Fetch document from Firestore
    const documentSnapshot = await firestore().collection(appCollection).doc(key).get();

    // If the document exists, return its dat a. Else, return undefined or a default value.
    if (documentSnapshot.exists) {
      return documentSnapshot.data();
    } else {
      console.log('No document found for the given key in the specified appCollection.');
      return undefined; // or any default value you'd like to return
    }
  } catch (error:any) {
    console.error("An error occurred:", error.message);
    console.log(`Please ensure you have the appropriate Firestore rules set up and the document/key exists.`);
  }
}