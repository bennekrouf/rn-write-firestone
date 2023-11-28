import firestore from '@react-native-firebase/firestore';
import { Logger } from 'mayo-logger'; 
import { getStorageDetails } from './utils/getStorageDetails';

export const writeToFirebase = async (data:any, merge: boolean = true) => {
  
  try {
    const details = await getStorageDetails();
  
    Logger.info('Attempting to persist data to Firestore', 
      { key: details.firestoreKey, data, mergeOption: merge }, 
      { tag: 'mayo-firestore-write' }
    );
    return firestore().collection(details.collection).doc(details.firestoreKey).set(data, { merge });
  } catch (error:any) {
    Logger.error('Error occurred while saving data to Firestore', error, { tag: 'mayo-firestore-write' });
    Logger.warn(
      `Please ensure you have the following Firestore rules set up:
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            // Dynamic Rules for any appCollection
            match /{appCollection}/{id} {
              allow read, write: if request.auth != null && 
                                (request.auth.token.email == id || request.auth.token.uid == id);
            }
          }
        }`,
      null,
      { tag: 'mayo-firestore-write' }
    );
  }
}
