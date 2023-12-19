import { getAppName } from './getAppName';
import { getKey } from './getKey';
import { Logger } from "mayo-logger";

export const getStorageDetails = async () => {
  try {
    Logger.info("Fetching application name...", null, {tag: 'mayo-firestore-write'});
    const app = getAppName();

    Logger.info("Fetching key...", null, {tag: 'mayo-firestore-write'});
    const key = await getKey();

    if (!app) {
      Logger.warn("Application name not retrieved. It might be undefined or null.", null, {tag: 'mayo-firestore-write'});
    }

    const appCollection = app?.toLocaleLowerCase();

    const firestoreKey = key;
    const asyncStorageKey = `${appCollection}:${key}`;
    
    Logger.info(`Constructed storage key for AsyncStorage: `, asyncStorageKey, {tag: 'mayo-firestore-write'});
    Logger.info(`Constructed key for Firestore:`, firestoreKey, {tag: 'mayo-firestore-write'});

    return {
      collection: appCollection,  // For Firestore
      firestoreKey: firestoreKey,  // The document ID in Firestore
      asyncStorageKey: asyncStorageKey  // For AsyncStorage
    };
  } catch (err) {
    Logger.error("Failed to construct storage details:", err, {tag: 'mayo-firestore-write'});
    throw err; 
  }
};
