import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseApp = initializeApp(config.public.firebase as Record<string, string>);

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  // Connect to emulators in development
  if (import.meta.dev) {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      connectFirestoreEmulator(firestore, 'localhost', 8080);
      connectStorageEmulator(storage, 'localhost', 9199);
    } catch {
      // Emulators may already be connected
    }
  }

  return {
    provide: {
      firebaseApp,
      auth,
      firestore,
      storage,
    },
  };
});
