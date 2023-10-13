import AsyncStorage from '@react-native-community/async-storage';

import { getStorageKey } from './utils/getStorageKey';

export const writeToAsyncStorage = async (data: any) => {
  const storageKey = await getStorageKey();

  console.log(`Try to persist storageKey : ${storageKey} Value : ${JSON.stringify(data)}`);

  try {
    await AsyncStorage.setItem(storageKey[data], JSON.stringify(data));
    console.log('Data successfully saved to AsyncStorage');
  } catch (error:any) {
    console.error("An error occurred:", error.message);
  }
}
