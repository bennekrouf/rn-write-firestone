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
      app: string,
      firebaseConfig: FirebaseConfig,
      googleCredential: any
    ): Promise<User>;

    export function writeToFirebase(app: string, data: any): Promise<User | null>;
    export function writeToAsyncStorage(app: string, data: any): Promise<User | null>;
    export function syncAsyncStorageToFirestore(app: string): Promise<null>;
    export function getUser(): Promise<User | null>;
  }
  