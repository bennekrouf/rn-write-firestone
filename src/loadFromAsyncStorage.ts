import AsyncStorage from '@react-native-community/async-storage';

import { getStorageKey } from './utils/getStorageKey';

export const loadFromAsyncStorage = async () => {
  try {
    const storageKey = await getStorageKey();
    console.log(`RN Loading from AsyncStorage with key : ${storageKey}`);
    const dataString = await AsyncStorage.getItem(storageKey);

    if (dataString) {
      return JSON.parse(dataString);  // Convert string back to object
    } else {
      console.log('No data found for the given storageKey in AsyncStorage.');
      return undefined;  // or any default value you'd like to return
    }
  } catch (error:any) {
    console.error("An error occurred:", error.message);
    console.log("Please ensure you have read/write permissions for AsyncStorage and the key exists.");
  }
}
