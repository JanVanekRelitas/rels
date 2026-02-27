import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import type { Task, TaskInput, TaskStatus } from '@rels/shared';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  let unsubscribe: Unsubscribe | null = null;

  function subscribe(filters?: { spzn?: string; status?: TaskStatus; assignedTo?: string }) {
    const { $firestore } = useNuxtApp();
    loading.value = true;

    const constraints = [];
    if (filters?.spzn) constraints.push(where('spzn', '==', filters.spzn));
    if (filters?.status) constraints.push(where('status', '==', filters.status));
    if (filters?.assignedTo) constraints.push(where('assignedTo', '==', filters.assignedTo));
    constraints.push(orderBy('datum', 'desc'));

    const q = query(collection($firestore, 'tasks'), ...constraints);

    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        tasks.value = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }) as Task);
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

  async function addTask(input: TaskInput) {
    const { $firestore } = useNuxtApp();
    await addDoc(collection($firestore, 'tasks'), {
      ...input,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  async function updateTask(id: string, data: Partial<TaskInput>) {
    const { $firestore } = useNuxtApp();
    await updateDoc(doc($firestore, 'tasks', id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  async function removeTask(id: string) {
    const { $firestore } = useNuxtApp();
    await deleteDoc(doc($firestore, 'tasks', id));
  }

  return { tasks, loading, error, subscribe, unsubscribeAll, addTask, updateTask, removeTask };
});
