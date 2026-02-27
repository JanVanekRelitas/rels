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
import type { Contact, ContactInput } from '@rels/shared';

export const useContactsStore = defineStore('contacts', () => {
  const contacts = ref<Contact[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  let unsubscribe: Unsubscribe | null = null;

  function subscribe() {
    const { $firestore } = useNuxtApp();
    loading.value = true;

    const q = query(collection($firestore, 'contacts'), orderBy('jmeno'));

    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        contacts.value = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }) as Contact);
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

  async function addContact(input: ContactInput) {
    const { $firestore } = useNuxtApp();
    await addDoc(collection($firestore, 'contacts'), {
      ...input,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  async function updateContact(id: string, data: Partial<ContactInput>) {
    const { $firestore } = useNuxtApp();
    await updateDoc(doc($firestore, 'contacts', id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  async function removeContact(id: string) {
    const { $firestore } = useNuxtApp();
    await deleteDoc(doc($firestore, 'contacts', id));
  }

  return { contacts, loading, error, subscribe, unsubscribeAll, addContact, updateContact, removeContact };
});
