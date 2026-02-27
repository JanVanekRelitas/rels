import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import type { TaskStatus } from '@rels/shared';

/**
 * Composable for task-specific operations (timer, status changes).
 */
export function useTask() {
  const { $firestore } = useNuxtApp();

  const timerRunning = ref(false);
  const timerStart = ref<number | null>(null);
  const elapsed = ref(0);

  let interval: ReturnType<typeof setInterval> | null = null;

  function startTimer() {
    timerRunning.value = true;
    timerStart.value = Date.now();
    interval = setInterval(() => {
      elapsed.value = Math.floor((Date.now() - timerStart.value!) / 1000);
    }, 1000);
  }

  function stopTimer(): number {
    timerRunning.value = false;
    if (interval) clearInterval(interval);
    const hours = elapsed.value / 3600;
    elapsed.value = 0;
    timerStart.value = null;
    return hours;
  }

  async function changeStatus(taskId: string, status: TaskStatus) {
    await updateDoc(doc($firestore, 'tasks', taskId), {
      status,
      updatedAt: serverTimestamp(),
    });
  }

  return { timerRunning, elapsed, startTimer, stopTimer, changeStatus };
}
