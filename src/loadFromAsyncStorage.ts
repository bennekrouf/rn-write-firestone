import AsyncStorage from '@react-native-community/async-storage';
import { Logger } from 'rn-logging'; 
import { getStorageDetails } from './utils/getStorageDetails';

export const loadFromAsyncStorage = async () => {
  try {
    const details = await getStorageDetails();

    Logger.info('Attempting to load data from AsyncStorage : ', details, { tag: 'rn-write-firestore' });
    const dataString = await AsyncStorage.getItem(details.asyncStorageKey);

    if (dataString) {
      Logger.info('Data successfully retrieved from AsyncStorage', JSON.parse(dataString), { tag: 'rn-write-firestore' });
      return JSON.parse(dataString);  // Convert string back to object
    } else {
      Logger.warn('No data found for the given storageKey in AsyncStorage.', details.asyncStorageKey, { tag: 'rn-write-firestore' });
      return undefined;  // or any default value you'd like to return
    }
  } catch (error:any) {
    Logger.error('Failed to load data from AsyncStorage', error, { tag: 'rn-write-firestore' });
    Logger.warn('Please ensure you have read/write permissions for AsyncStorage and the key exists.', null, { tag: 'rn-write-firestore' });
  }
}
