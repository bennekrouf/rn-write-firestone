import AsyncStorage from '@react-native-community/async-storage';
import { Logger } from 'rn-logging'; 
import { getStorageKey } from './utils/getStorageKey';

export const loadFromAsyncStorage = async () => {
  try {
    const storageKey = await getStorageKey();

    Logger.info('Attempting to load data from AsyncStorage', null, { tag: 'Storage', timestamp: true });
    const dataString = await AsyncStorage.getItem(storageKey);

    if (dataString) {
      Logger.info('Data successfully retrieved from AsyncStorage', JSON.parse(dataString), { tag: 'Storage', timestamp: true });
      return JSON.parse(dataString);  // Convert string back to object
    } else {
      Logger.warn('No data found for the given storageKey in AsyncStorage.', null, { tag: 'Storage', timestamp: true });
      return undefined;  // or any default value you'd like to return
    }
  } catch (error:any) {
    Logger.error('Failed to load data from AsyncStorage', error, { tag: 'Storage', timestamp: true });
    Logger.warn('Please ensure you have read/write permissions for AsyncStorage and the key exists.', null, { tag: 'Storage', timestamp: true });
  }
}
