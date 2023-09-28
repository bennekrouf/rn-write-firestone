import AsyncStorage from '@react-native-community/async-storage';
import { getKey } from './getKey';

export const writeToAsyncStorage = async (key: string, data: any) => {
  const userKey = await getKey();

  try {
    // Retrieve current data from AsyncStorage
    const existingDataString = await AsyncStorage.getItem(userKey);
    const existingData = existingDataString ? JSON.parse(existingDataString) : {};

    // Merge existing AsyncStorage data with the new data being provided
    const mergedData = { ...existingData, ...data };

    // Saving merged data to AsyncStorage
    await AsyncStorage.setItem(userKey, JSON.stringify({[key]: JSON.stringify(mergedData)}));

    console.log(`Data merged and stored in AsyncStorage ${await AsyncStorage.getItem(userKey)}`);
  } catch (error) {
    console.error("RNNNN Error fetching or merging data writeToAsyncStorage", error);
  }

  return true;
}
