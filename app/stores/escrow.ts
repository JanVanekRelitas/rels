import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import type { EscrowAccount, EscrowAccountInput } from '@rels/shared';

export const useEscrowStore = defineStore('escrow', () => {
  const accounts = ref<EscrowAccount[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  let unsubscribe: Unsubscribe | null = null;

  function subscribe() {
    const { $firestore } = useNuxtApp();
    loading.value = true;

    const q = query(collection($firestore, 'escrowAccounts'), orderBy('spzn'));

    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        accounts.value = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }) as EscrowAccount);
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

  async function addAccount(input: EscrowAccountInput) {
    const { $firestore } = useNuxtApp();
    await addDoc(collection($firestore, 'escrowAccounts'), {
      ...input,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  async function updateAccount(id: string, data: Partial<EscrowAccountInput>) {
    const { $firestore } = useNuxtApp();
    await updateDoc(doc($firestore, 'escrowAccounts', id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  async function removeAccount(id: string) {
    const { $firestore } = useNuxtApp();
    await deleteDoc(doc($firestore, 'escrowAccounts', id));
  }

  return { accounts, loading, error, subscribe, unsubscribeAll, addAccount, updateAccount, removeAccount };
});
