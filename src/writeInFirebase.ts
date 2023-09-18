import firestore from '@react-native-firebase/firestore';
import {getUser} from './getUser';

export const writeInFirebase = async (app:string, data:any) => {
  const user = await getUser();
  const id = user?.email || user?.uid;
  const appCollection = app?.toLocaleLowerCase();
  console.log(`Try to persist in : ${appCollection}/${id}`);
  await firestore()
    .collection(appCollection)
    .doc(id)
    .set(
      data,
      { merge: true }
    );
  console.log('AFTER firestore()');
  return user;
}