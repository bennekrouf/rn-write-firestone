import firebase from '@react-native-firebase/app';

export const customInitializeFirebase = (firebaseConfig:any) => {
  try {
    if (!firebase.apps.length) {
      console.log(`RN Init firebase app with : ${firebaseConfig}`);
      return firebase.initializeApp(firebaseConfig);
    } else {
      console.log(`RN Found firebase app : ${JSON.stringify(firebase.apps)}`);
      return firebase.app();
    }
  } catch (error) {
    console.log(`RN Init firebase app ERROR : ${error}`);
    return error; 
  }
};