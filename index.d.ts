declare module 'rn-write-firestore' {
    interface FirebaseConfig {
      apiKey: string;
      authDomain: string;
    }

    interface User {
      uid: string;
      email: string;
      data: any;
    }
  
    export function signInFirebase(
      firebaseConfig: FirebaseConfig,
      googleCredential: any
    ): Promise<User>;

    export function writeToFirebase(data: any, merge?: boolean): Promise<User | null>;
    export function loadFromFirebase(): Promise<any | null>;
    export function writeToAsyncStorage(data: any, merge?: boolean): Promise<User | null>;
    export function loadFromAsyncStorage(): Promise<any | null>;
    export function syncAsyncStorageToFirestore(): Promise<null>;
    export function flushFromAsyncStorage(): Promise<null>;
    
    export function getUser(): Promise<User | null>;
  }
  