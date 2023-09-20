import firebase from '@react-native-firebase/app';

export const customInitializeFirebase = (firebaseConfig:any) => {
  if (!firebase.apps.length) {
    console.log(`RN Init firebase app with : ${firebaseConfig}`);
    firebase.initializeApp(firebaseConfig);
  } else {
    console.log(`RN Found firebase app : ${JSON.stringify(firebase.apps)}`);
    firebase.app();
  }
};