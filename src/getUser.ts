import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from 'mayo-logger';

export async function getUser(storageKey = 'user') {
  try {
    const userString = await AsyncStorage.getItem(storageKey);

    if (userString !== null) {
      Logger.info('Successfully retrieved user from storage', JSON.parse(userString), { tag: 'User' });
      return JSON.parse(userString);
    } else {
      Logger.info('No user data found in storage.', null, { tag: 'User' });
      return null;
    }
  } catch (e) {
    Logger.error('Failed to get user from storage', e, { tag: 'User' });
    return null;
  }
}
