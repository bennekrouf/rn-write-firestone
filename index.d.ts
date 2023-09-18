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

    export function writeInFirebase(app: string, data: any): Promise<User | null>;
  }
  