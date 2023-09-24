declare module 'rn-write-firestone' {
    interface FirebaseConfig {
      apiKey: string;
      authDomain: string;
    }
  
    interface User {
      uid: string;
      email: string;
    }
  
    export function signInFirebase(
      firebaseConfig: FirebaseConfig,
      googleCredential: any
    ): Promise<User>;

    export function writeToFirebase(data: any): Promise<User | null>;
    export function writeToAsyncStorage(data: any): Promise<User | null>;
    export function syncAsyncStorageToFirestore(): Promise<null>;
    export function getUser(): Promise<User | null>;
  }
  