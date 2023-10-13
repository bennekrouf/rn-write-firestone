import AsyncStorage from '@react-native-community/async-storage';
import { getStorageKey } from './utils/getStorageKey';

export const flushFromAsyncStorage = async () => {
  const storageKey = await getStorageKey();

  console.log(`Try to remove storageKey : ${storageKey} from AsyncStorage`);

  try {
    await AsyncStorage.removeItem(storageKey);
    console.log('Data successfully removed from AsyncStorage');
  } catch (error: any) {
    console.error("An error occurred:", error.message);
  }
}
