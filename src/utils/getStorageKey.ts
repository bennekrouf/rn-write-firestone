import { getAppName } from './getAppName';
import { getKey } from './getKey';
import { Logger } from "rn-logging";

export const getStorageKey = async () => {
  try {
    Logger.info("Fetching application name...");
    const app = getAppName();

    Logger.info("Fetching key...");
    const key = await getKey();

    if (!app) {
      Logger.warn("Application name not retrieved. It might be undefined or null.");
    }

    const appCollection = app?.toLocaleLowerCase();
    
    const storageKey = `${appCollection}:${key}`;
    Logger.info(`Constructed storage key: ${storageKey}`);

    return storageKey;
  } catch (err) {
    Logger.error("Failed to construct storage key:", err);
    throw err; 
  }
};
