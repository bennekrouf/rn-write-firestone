import { getAppName } from './getAppName';
import { getKey } from './getKey';
import { Logger } from "rn-logging";

export const getStorageDetails = async () => {
  try {
    Logger.info("Fetching application name...");
    const app = getAppName();

    Logger.info("Fetching key...");
    const key = await getKey();

    if (!app) {
      Logger.warn("Application name not retrieved. It might be undefined or null.");
    }

    const appCollection = app?.toLocaleLowerCase();

    const firestoreKey = key;  // Assuming 'key' is suitable for Firestore doc ID
    const asyncStorageKey = `${appCollection}:${key}`;
    
    Logger.info(`Constructed storage key for AsyncStorage: ${asyncStorageKey}`);
    Logger.info(`Constructed key for Firestore: ${firestoreKey}`);

    return {
      collection: appCollection,  // For Firestore
      firestoreKey: firestoreKey,  // The document ID in Firestore
      asyncStorageKey: asyncStorageKey  // For AsyncStorage
    };
  } catch (err) {
    Logger.error("Failed to construct storage details:", err);
    throw err; 
  }
};
