import * as functions from 'firebase-functions/v2';
import { getAuth } from 'firebase-admin/auth';

/**
 * When a new user is created, set default custom claims.
 * Default role is 'assistant'. The lawyer must manually promote users.
 */
export const onUserCreate = functions.identity.beforeUserCreated(async (event) => {
  const uid = event.data?.uid;
  if (!uid) return;

  await getAuth().setCustomUserClaims(uid, {
    role: 'assistant',
  });
});
