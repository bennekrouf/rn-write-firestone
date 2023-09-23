import firestore from '@react-native-firebase/firestore';
import {getUser} from './getUser';
import AsyncStorage from '@react-native-community/async-storage';

export const writeToFirebase = async (app:string, data:any, persistInAsyncStorage: boolean = true) => {
  const user = await getUser();
  const id = user?.email || user?.uid;
  const appCollection = app?.toLocaleLowerCase();

  console.log(`Try to persist in : ${appCollection}/${id}`);

  if (persistInAsyncStorage) {
    try {
      // Retrieve current data from firestore
      const documentSnapshot = await firestore().collection(appCollection).doc(id).get();

      // Initial mergedData is the new data being provided
      let mergedData = data;

      if (documentSnapshot.exists) {
        const firestoreData = documentSnapshot.data();
        mergedData = { ...firestoreData, ...data }; // Merging firestore data with new data
      }

      // Retrieve current data from AsyncStorage
      const existingDataString = await AsyncStorage.getItem('user');
      const existingData = existingDataString ? JSON.parse(existingDataString) : {};

      // Merge existing AsyncStorage data with previously merged data
      mergedData = { ...existingData, ...mergedData };

      // Saving merged data to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(mergedData));      
    } catch (error) {
      console.error("Error fetching or merging data", error);
    }
  }

  await firestore()
    .collection(appCollection)
    .doc(id)
    .set(data, { merge: true });

  console.log('AFTER firestore()');

  return user;
}