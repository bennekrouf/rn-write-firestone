import firebase from '@react-native-firebase/app';

export const customInitializeFirebase = (firebaseConfig:any) => {
  if (!firebase.apps.length) {
    console.log(`RN Init firebase app with : ${firebaseConfig}`);
    return firebase.initializeApp(firebaseConfig);
  } else {
    console.log(`RN Found firebase app : ${JSON.stringify(firebase.apps)}`);
    return firebase.app();
  }
};