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
import type { LegalCase, LegalCaseInput } from '@rels/shared';

export const useCasesStore = defineStore('cases', () => {
  const cases = ref<LegalCase[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  let unsubscribe: Unsubscribe | null = null;

  function subscribe(showArchived = false) {
    const { $firestore } = useNuxtApp();
    loading.value = true;

    const q = query(
      collection($firestore, 'cases'),
      where('archivovano', '==', showArchived),
      orderBy('updatedAt', 'desc'),
    );

    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        cases.value = snapshot.docs.map((d) => ({ ...d.data(), spzn: d.id }) as LegalCase);
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

  async function saveCase(input: LegalCaseInput) {
    const { $firestore } = useNuxtApp();
    const ref = doc($firestore, 'cases', input.spzn);
    await setDoc(ref, { ...input, updatedAt: serverTimestamp() }, { merge: true });
  }

  async function removeCase(spzn: string) {
    const { $firestore } = useNuxtApp();
    await deleteDoc(doc($firestore, 'cases', spzn));
  }

  return { cases, loading, error, subscribe, unsubscribeAll, saveCase, removeCase };
});
