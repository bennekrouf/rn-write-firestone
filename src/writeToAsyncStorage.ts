import AsyncStorage from '@react-native-community/async-storage';
import { Logger } from 'rn-logging'; 
import { getStorageKey } from './utils/getStorageKey';

export const writeToAsyncStorage = async (data: any) => {
  const storageKey = await getStorageKey();

  Logger.info('Attempting to persist data to AsyncStorage', { storageKey, data }, { tag: 'AsyncStorage', timestamp: true });

  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(data));
    Logger.info('Data successfully saved to AsyncStorage', null, { tag: 'AsyncStorage', timestamp: true });
  } catch (error:any) {
    Logger.error('Error occurred while saving data to AsyncStorage', error, { tag: 'AsyncStorage', timestamp: true });
  }
}
