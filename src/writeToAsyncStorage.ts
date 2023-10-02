import AsyncStorage from '@react-native-community/async-storage';

import { getAppName } from './getAppName';
import {getKey} from './getKey';

export const writeToAsyncStorage = async (data: any) => {
  const app = getAppName();
  const key = await getKey();
  const appCollection = app?.toLocaleLowerCase();

  const storageKey = `${appCollection}:${key}`;  // Formulating a unique key

  console.log(`Try to persist storageKey : ${storageKey} Value : ${JSON.stringify(data)}`);

  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(data));
    console.log('Data successfully saved to AsyncStorage');
  } catch (error:any) {
    console.error("An error occurred:", error.message);
  }
}
