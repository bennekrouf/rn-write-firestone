import AsyncStorage from '@react-native-community/async-storage';

import { getKey } from './getKey';
import { getAppName } from './getAppName';

export const loadFromAsyncStorage = async () => {
  const app = getAppName();
  const key = await getKey();
  const appCollection = app?.toLocaleLowerCase();

  const storageKey = `${appCollection}:${key}`;

  try {
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
