import firestore from '@react-native-firebase/firestore';

import {getKey} from './getKey';
import { getAppName } from './getAppName';

export const writeToFirebase = async (data:any, merge: boolean = true) => {
  const app = getAppName();
  const key = await getKey();
  const appCollection = app?.toLocaleLowerCase();

  console.log(`Try to persist key : ${key} Value : ${JSON.stringify(data)}`);
  try {
    return firestore().collection(appCollection).doc(key).set(data, { merge });
  } catch (error:any) {
    console.error("An error occurred:", error.message);
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