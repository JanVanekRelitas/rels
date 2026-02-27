import {
  collection,
  query,
  onSnapshot,
  type Query,
  type DocumentData,
  type QueryConstraint,
  type Unsubscribe,
} from 'firebase/firestore';

/**
 * Generic composable for subscribing to a Firestore collection with real-time updates.
 */
export function useFirestoreCollection<T extends DocumentData>(
  collectionPath: string,
  constraints: QueryConstraint[] = [],
  idField: string = 'id',
) {
  const { $firestore } = useNuxtApp();
  const data = ref<T[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  let unsubscribe: Unsubscribe | null = null;

  function subscribe(newConstraints?: QueryConstraint[]) {
    unsubscribe?.();
    loading.value = true;
    error.value = null;

    const q: Query = query(
      collection($firestore, collectionPath),
      ...(newConstraints ?? constraints),
    );

    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        data.value = snapshot.docs.map(
          (doc) => ({ ...doc.data(), [idField]: doc.id }) as T,
        );
        loading.value = false;
      },
      (err) => {
        error.value = err.message;
        loading.value = false;
      },
    );
  }

  function stop() {
    unsubscribe?.();
    unsubscribe = null;
  }

  onUnmounted(stop);

  return { data, loading, error, subscribe, stop };
}
