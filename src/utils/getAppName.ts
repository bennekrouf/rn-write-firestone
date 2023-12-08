import firebase from '@react-native-firebase/app';
import DeviceInfo from 'react-native-device-info';

export const getAppName = () : string => {
  if (!firebase?.apps?.length) {
    // If no Firebase app is initialized, throw an error
    throw new Error("Firebase app is not initialized. Call signInFirebase before!");
  }

  // Assuming a Firebase app is initialized, get the default app
  const defaultApp = firebase.app();

  // Return the name of the Firebase app if it's not '[DEFAULT]', otherwise return the bundle ID
  return defaultApp.name !== '[DEFAULT]' ? defaultApp.name : DeviceInfo.getBundleId();
};
