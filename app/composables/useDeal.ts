import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  type Unsubscribe,
} from 'firebase/firestore';
import type { Deal, Payment, EscrowEntry, CadastralProceeding } from '@rels/shared';

/**
 * Composable for loading a single deal with its subcollections.
 */
export function useDeal(spzn: string) {
  const { $firestore } = useNuxtApp();

  const deal = ref<Deal | null>(null);
  const payments = ref<Payment[]>([]);
  const escrowEntries = ref<EscrowEntry[]>([]);
  const cadastral = ref<CadastralProceeding[]>([]);
  const loading = ref(true);

  const unsubs: Unsubscribe[] = [];

  function subscribe() {
    // Deal document
    unsubs.push(
      onSnapshot(doc($firestore, 'deals', spzn), (snap) => {
        deal.value = snap.exists() ? ({ ...snap.data(), spzn: snap.id } as Deal) : null;
        loading.value = false;
      }),
    );

    // Payments subcollection
    unsubs.push(
      onSnapshot(
        query(collection($firestore, `deals/${spzn}/payments`), orderBy('datum', 'desc')),
        (snap) => {
          payments.value = snap.docs.map((d) => ({ ...d.data(), id: d.id }) as Payment);
        },
      ),
    );

    // Escrow subcollection
    unsubs.push(
      onSnapshot(
        query(collection($firestore, `deals/${spzn}/escrow`), orderBy('datum', 'desc')),
        (snap) => {
          escrowEntries.value = snap.docs.map((d) => ({ ...d.data(), id: d.id }) as EscrowEntry);
        },
      ),
    );

    // Cadastral subcollection
    unsubs.push(
      onSnapshot(
        query(collection($firestore, `deals/${spzn}/cadastral`), orderBy('datumPodani', 'desc')),
        (snap) => {
          cadastral.value = snap.docs.map(
            (d) => ({ ...d.data(), id: d.id }) as CadastralProceeding,
          );
        },
      ),
    );
  }

  function stop() {
    unsubs.forEach((u) => u());
    unsubs.length = 0;
  }

  onUnmounted(stop);

  return { deal, payments, escrowEntries, cadastral, loading, subscribe, stop };
}
