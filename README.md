# 🚀 Firetstore Helper for React Native

A utility package for React Native apps which provides an abstract layer around Firebase functionalities, particularly focusing on authentication, and syncing between Firestore and AsyncStorage.

## Features

- 🔒 Firebase Authentication with Google.
- 💾 Seamless synchronization between Firestore and AsyncStorage.
- 📖 Comprehensive logging using `rn-logging`.
- 📦 Lightweight & minimal setup.

## Installation

```bash
yarn add rn-write-firestore
```

## Prerequisites

Ensure you have @react-native-firebase/auth, @react-native-firebase/firestore, and @react-native-async-storage/async-storage installed in your React Native project.

## Usage

### 1. Firebase Authentication

To sign in using Firebase with Google credentials:

```Javascript
import { signInFirebase } from 'rn-write-firestore';

const firebaseConfig = {
  // your firebase config here
};

const googleCredential = {
  // your google credential here
};

signInFirebase(firebaseConfig, googleCredential)
  .then(user => {
    console.log("Signed in user:", user);
  })
  .catch(error => {
    console.error("Error during Firebase sign-in:", error);
  });

```


### 2. AsyncStorage Operations

To load data from AsyncStorage:
```Javascript
import { loadFromAsyncStorage } from 'rn-write-firestore';

const data = await loadFromAsyncStorage();

```


To write data to AsyncStorage:

```Javascript
import { writeToAsyncStorage } from 'rn-write-firestore';

const sampleData = {
  key1: 'value1',
  key2: 'value2',
  // ...
};
await writeToAsyncStorage(sampleData);

```


### 3. Firestore Operations

To load data from Firestore:

```Javascript
import { loadFromFirebase } from 'rn-write-firestore';

const data = await loadFromFirebase();

```

To sync AsyncStorage data to Firestore:

```Javascript
import { syncAsyncStorageToFirestore } from 'rn-write-firestore';

await syncAsyncStorageToFirestore();

```

### 4. Removing Data from AsyncStorage

To remove a particular data (identified by its storageKey) from AsyncStorage:

```javascript
import { flushFromAsyncStorage } from 'rn-write-firestore';

await flushFromAsyncStorage();
```

This function will attempt to locate the data associated with the storageKey in AsyncStorage and then remove it. All actions will be logged using the integrated rn-logging module.

## Contribute

Contributions are always welcome! Please read the contribution guidelines first.

## License

rn-write-firestore is licensed under MIT.

