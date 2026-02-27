import { firestore } from 'firebase-functions/v2';

/**
 * When a deal document is written, update denormalized counters.
 * This trigger handles updating taskSummary, financeSummary, cadastralSummary.
 */
export const onDealWrite = firestore.onDocumentWritten(
  { document: 'deals/{spzn}', region: 'europe-west1' },
  async (event) => {
    const after = event.data?.after?.data();
    if (!after) return; // Document deleted

    // TODO: Recalculate denormalized summaries from subcollections
    // This will be implemented when subcollection writes are in place
  },
);
