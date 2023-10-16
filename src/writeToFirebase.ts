import firestore from '@react-native-firebase/firestore';
import { Logger } from 'rn-logging'; 
import { getKey } from './utils/getKey';
import { getAppName } from './utils/getAppName';

export const writeToFirebase = async (data:any, merge: boolean = true) => {
  const app = getAppName();
  const key = await getKey();
  const appCollection = app?.toLocaleLowerCase();

  Logger.info('Attempting to persist data to Firestore', 
    { appCollection, key, data, mergeOption: merge }, 
    { tag: 'Firestore', timestamp: true }
  );

  try {
    return firestore().collection(appCollection).doc(key).set(data, { merge });
  } catch (error:any) {
    Logger.error('Error occurred while saving data to Firestore', error, { tag: 'Firestore', timestamp: true });
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
      { tag: 'Firestore', timestamp: true }
    );
  }
}
