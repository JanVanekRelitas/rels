import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import type { Deal, DealInput } from '@rels/shared';

export const useDealsStore = defineStore('deals', () => {
  const deals = ref<Deal[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  let unsubscribe: Unsubscribe | null = null;

  function subscribe(showArchived = false) {
    const { $firestore } = useNuxtApp();
    loading.value = true;
    error.value = null;

    const constraints = [
      where('archivovano', '==', showArchived),
      orderBy('updatedAt', 'desc'),
    ];

    const q = query(collection($firestore, 'deals'), ...constraints);

    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        deals.value = snapshot.docs.map((d) => ({ ...d.data(), spzn: d.id }) as Deal);
        loading.value = false;
      },
      (err) => {
        error.value = err.message;
        loading.value = false;
      },
    );
  }

  function unsubscribeAll() {
    unsubscribe?.();
    unsubscribe = null;
  }

  async function saveDeal(input: DealInput) {
    const { $firestore } = useNuxtApp();
    const ref = doc($firestore, 'deals', input.spzn);
    await setDoc(ref, { ...input, updatedAt: serverTimestamp() }, { merge: true });
  }

  async function removeDeal(spzn: string) {
    const { $firestore } = useNuxtApp();
    await deleteDoc(doc($firestore, 'deals', spzn));
  }

  return {
    deals,
    loading,
    error,
    subscribe,
    unsubscribeAll,
    saveDeal,
    removeDeal,
  };
});
