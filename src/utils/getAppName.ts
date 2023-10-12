import firebase from '@react-native-firebase/app';
import DeviceInfo from 'react-native-device-info';

export const getAppName = () : string => {
  const bundleID = DeviceInfo.getBundleId();
  if (!firebase.apps.length) {
    console.log(`RN Init firebase app`);
    return 'NO_APP_NAME';
  } else {
    const defaultApp = firebase.app();
    return defaultApp.name !== '[DEFAULT]' ? defaultApp.name : bundleID;
  }
};