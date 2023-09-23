import AsyncStorage from '@react-native-community/async-storage';
import { getUser } from './getUser';

export const writeToAsyncStorage = async (app: string, data:any) => {
  const user = await getUser();

  try {
    const key = `${user}-${app}`;
    // Retrieve current data from AsyncStorage
    const existingDataString = await AsyncStorage.getItem(key);
    const existingData = existingDataString ? JSON.parse(existingDataString) : {};

    // Merge existing AsyncStorage data with the new data being provided
    const mergedData = { ...existingData, ...data };

    // Saving merged data to AsyncStorage
    await AsyncStorage.setItem(key, JSON.stringify(mergedData));

    console.log('Data merged and stored in AsyncStorage.');

  } catch (error) {
    console.error("Error fetching or merging data", error);
  }

  return user;
}
