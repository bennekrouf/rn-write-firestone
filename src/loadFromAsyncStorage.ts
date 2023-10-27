import AsyncStorage from '@react-native-community/async-storage';
import { Logger } from 'mayo-logger'; 
import { getStorageDetails } from './utils/getStorageDetails';

export const loadFromAsyncStorage = async () => {
  try {
    const details = await getStorageDetails();

    Logger.info('Attempting to load data from AsyncStorage : ', details.asyncStorageKey, { tag: 'mayo-firestore-write' });
    const dataString = await AsyncStorage.getItem(details.asyncStorageKey);

    if (dataString) {
      Logger.info('Data successfully retrieved from AsyncStorage', JSON.parse(dataString), { tag: 'mayo-firestore-write' });
      return JSON.parse(dataString)?.data;  // Convert string back to object
    } else {
      Logger.warn('No data found for the given storageKey in AsyncStorage.', details.asyncStorageKey, { tag: 'mayo-firestore-write' });
      return undefined;  // or any default value you'd like to return
    }
  } catch (error:any) {
    Logger.error('Failed to load data from AsyncStorage', error, { tag: 'mayo-firestore-write' });
    Logger.warn('Please ensure you have read/write permissions for AsyncStorage and the key exists.', null, { tag: 'mayo-firestore-write' });
  }
}
