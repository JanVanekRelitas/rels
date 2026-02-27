import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseApp = initializeApp(config.public.firebase as Record<string, string>);

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  // Use localStorage persistence in E2E mode so Playwright storageState captures tokens
  if (config.public.e2e) {
    setPersistence(auth, browserLocalPersistence);
  }

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
