import AsyncStorage from '@react-native-community/async-storage';
import { getStorageKey } from './utils/getStorageKey';
import { Logger } from 'rn-logging';

export const flushFromAsyncStorage = async () => {
  const storageKey = await getStorageKey();

  Logger.info('Attempting to remove storageKey from AsyncStorage', { storageKey }, { tag: 'Storage' });

  try {
    await AsyncStorage.removeItem(storageKey);
    Logger.info('Data successfully removed from AsyncStorage', { storageKey }, { tag: 'Storage' });
  } catch (error: any) {
    Logger.error('Error occurred while removing data from AsyncStorage', error, { tag: 'Storage' });
  }
}
