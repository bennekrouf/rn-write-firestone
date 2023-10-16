import { getAppName } from './getAppName';
import {getKey} from './getKey';

export const getStorageKey = async () => {
  const app = getAppName();
  const key = await getKey();
  const appCollection = app?.toLocaleLowerCase();

  return `${appCollection}:${key}`;  // Formulating a unique key
}
