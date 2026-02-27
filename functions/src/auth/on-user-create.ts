import { beforeUserCreated } from 'firebase-functions/v2/identity';

/**
 * When a new user is created, set default custom claims.
 * Default role is 'assistant'. The lawyer must manually promote users.
 */
export const onUserCreate = beforeUserCreated(() => {
  return {
    customClaims: {
      role: 'assistant',
    },
  };
});
