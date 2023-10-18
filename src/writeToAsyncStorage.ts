import AsyncStorage from '@react-native-community/async-storage';
import { Logger } from 'rn-logging'; 
import { getStorageDetails } from './utils/getStorageDetails';

export const writeToAsyncStorage = async (data: any) => {
  const details = await getStorageDetails();

  Logger.info('Attempting to persist data to AsyncStorage', { key: details.asyncStorageKey, data }, { tag: 'rn-write-firestore' });

  try {
    await AsyncStorage.setItem(details.asyncStorageKey, JSON.stringify(data));
    Logger.info('Data successfully saved to AsyncStorage', null, { tag: 'rn-write-firestore' });
  } catch (error:any) {
    Logger.error('Error occurred while saving data to AsyncStorage', error, { tag: 'rn-write-firestore' });
  }
}
