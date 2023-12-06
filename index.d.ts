declare module 'mayo-firestore-write' {
    interface FirebaseConfig {
      apiKey: string;
      authDomain: string;
    }

    interface User {
      uid: string;
      email: string;
      data: any;
    }
  
    export function signInFirebase(googleCredential: any, firebaseConfig?: any | null): Promise<User>;

    export function writeToFirebase(data: any, merge?: boolean): Promise<User | null>;
    export function loadFromFirestore(): Promise<any | null>;
    export function writeToAsyncStorage(data: any, merge?: boolean): Promise<User | null>;
    export function loadFromAsyncStorage(): Promise<any | null>;
    export function syncAsyncStorageToFirestore(): Promise<null>;
    export function flushFromAsyncStorage(): Promise<null>;
    
    export function getUser(): Promise<User | null>;
  }
  