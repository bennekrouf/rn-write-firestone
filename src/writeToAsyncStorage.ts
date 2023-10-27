import AsyncStorage from '@react-native-community/async-storage';
import { Logger } from 'mayo-logger'; 
import { getStorageDetails } from './utils/getStorageDetails';

export const writeToAsyncStorage = async (data: any) => {
  const details = await getStorageDetails();

  Logger.info('Attempting to persist data to AsyncStorage', { key: details.asyncStorageKey, data }, { tag: 'mayo-firestore-write' });

  try {
    await AsyncStorage.setItem(details.asyncStorageKey, JSON.stringify({data: data}));
    Logger.info('Data successfully saved to AsyncStorage', null, { tag: 'mayo-firestore-write' });
  } catch (error:any) {
    Logger.error('Error occurred while saving data to AsyncStorage', error, { tag: 'mayo-firestore-write' });
  }
}
